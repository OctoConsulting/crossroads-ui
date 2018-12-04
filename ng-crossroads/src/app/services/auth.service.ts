
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { User } from '../models/user';

@Injectable()
export class AuthService {
  private BASE_URL = 'http://localhost:1337';

  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token');
  }

  logIn(email: string, password: string): Observable<any> {
    if (email !== 'lynne.johnson@octoconsulting.com' || password !== '1234') {
      const url = `${this.BASE_URL}/login`;
      return this.http.post<User>(url, {email, password});
    } else {
      const user: User = {
        id: '63718',
        email: 'lynne.johnson@octoconsulting.com',
        token: '1234567890'
      };
      return of(user);
    }
  }

  getStatus(): Observable<User> {
    const url = `${this.BASE_URL}/status`;
    return this.http.get<User>(url);
  }
}
