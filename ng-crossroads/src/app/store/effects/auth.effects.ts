
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, observable, throwError } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import {
  AuthActionTypes,
  LogIn,
  LogInSuccess,
  LogInFailure,
} from '../actions/auth.actions';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

  @Effect()
  LogIn: Observable<any> = this.actions
    .ofType(AuthActionTypes.LOGIN)
    .pipe(
      map((action: LogIn) => action.payload),
      switchMap(payload => {
        return this.authService.logIn(payload.email, payload.password)
          .pipe(
            map((response) => {
              return new LogInSuccess({token: response.sessionId, email: payload.email, displayName: response.username });
            }),
            catchError((error) => {
              return of(new LogInFailure({ error: error }));
            })
          );
      })
    );

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      localStorage.setItem('token', user.payload.token);
      localStorage.setItem('userId', user.payload.id || '');
      this.router.navigateByUrl('/batches');
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE),
    tap((user) => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    })
  );

  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((user) => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      this.router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  GetStatus: Observable<any> = this.actions
    .ofType(AuthActionTypes.GET_STATUS);
    // .pipe(
    //   switchMap(payload => {
    //     return this.authService.getStatus();
    //   })
    // );
}
