
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from '../models/user';

@Injectable()
export class AuthService {
  private BASE_URL = 'http://crossservice.us-west-1.elasticbeanstalk.com/crossroads/v1/login';

  constructor(private http: HttpClient) {}

  getToken(): string {
    try {
      return localStorage.getItem('token');
    } catch {
      return undefined;
    }
  }

  logIn(email: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}`;
    const token = this.encodeAuthToken(email, password);
    return this.http.post<User>(
      url,
      {},
      {
        headers: {
          Authorization: `Basic ${token}`,
        }
      }
    );
  }

  getStatus(): Observable<User> {
    const url = `${this.BASE_URL}/status`;
    return this.http.get<User>(url);
  }

  encodeAuthToken(username: string, password: string): string {
    return window.btoa(`${username}:${password}`);
  }
}
