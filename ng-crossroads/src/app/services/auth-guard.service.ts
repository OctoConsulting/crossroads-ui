import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from './auth.service';


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router
  ) {}
  canActivate(): boolean {
    const token = this.auth.getToken();

    if (!token) {
      this.router.navigateByUrl('/log-in');
      return false;
    }

    return true;
  }
}
