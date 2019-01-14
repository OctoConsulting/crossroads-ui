
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
    // .pipe(
    //   catchError(response => {console.log(response); return of(response.error.text); })
    // );

    // if (email !== 'lynne.johnson@octoconsulting.com' || password !== '1234') {
    //   const url = `${this.BASE_URL}`;
    //   return this.http.post<User>(url, {
    //     headers: {
    //       Authorization: 'Basic c3R1ZGVudDk6T2N0bzEyMyFAIw=='
    //     },
    //     params: {email: email, password: password}
    //   });
    // } else {
    //   const user: User = {
    //     id: '63718',
    //     email: 'lynne.johnson@octoconsulting.com',
    //     token: '1234567890'
    //   };
    //   return of(user);
    // }
  }

  getStatus(): Observable<User> {
    const url = `${this.BASE_URL}/status`;
    return this.http.get<User>(url);
  }

  encodeAuthToken(username: string, password: string): string {
    return window.btoa(`${username}:${password}`);
  }
}
