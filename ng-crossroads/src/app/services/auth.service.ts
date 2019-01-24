
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { User } from '../models/user';

@Injectable()
export class AuthService {
  private BASE_URL = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getToken(): string {
    try {
      return localStorage.getItem('token');
    } catch {
      return undefined;
    }
  }

  logIn(email: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}/v1/login`;
    const token = this.encodeAuthToken(email, password);
    return this.http.post(
      url,
      {},
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
        responseType: 'text'
     },
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
