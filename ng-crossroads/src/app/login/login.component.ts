import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { loginForm } from './form/login-form.config';
import { User } from '../models/user';
import { AuthState } from '../store/reducers/auth.reducer';
import { Store, select } from '@ngrx/store';
import { CloseSidenav } from '../store/actions/app.actions';
import { LogIn } from '../store/actions/auth.actions';
import { Observable } from 'rxjs';
import { mapDistinct } from '../utilities/mapDistinct';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  // public fields: FormlyFieldConfig[] = loginForm;
  public user: User = {
    email: undefined,
    password: undefined
  };
  public errorMessage: Observable<string>;
  public loading = false;

  constructor(private store: Store<AuthState>, private fb: FormBuilder) {
    this.errorMessage = this.store.pipe(select('auth'), mapDistinct(auth => {
      this.loading = false;
      return auth.errorMessage;
    }));

    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.closeSidenav();
    this.initiateFormOnChanges();
  }

  private initiateFormOnChanges(): void {
    this.form.get('userName').valueChanges.subscribe(
      newValue => {
        this.user.email = newValue;
      }
    );

    this.form.get('password').valueChanges.subscribe(
      newValue => {
        this.user.password = newValue;
      }
    );
  }

  public submit (user: User): void {
    this.loading = true;
    this.store.dispatch(new LogIn(user));
  }

  public closeSidenav () {
    this.store.dispatch(new CloseSidenav());
  }

}
