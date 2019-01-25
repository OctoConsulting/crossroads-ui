import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { loginForm } from './form/login-form.config';
import { User } from '../models/user';
import { AuthState } from '../store/reducers/auth.reducer';
import { Store, select } from '@ngrx/store';
import { LogIn } from '../store/actions/auth.actions';
import { Observable } from 'rxjs';
import { mapDistinct } from '../utilities/mapDistinct';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form = new FormGroup({});
  public fields: FormlyFieldConfig[] = loginForm;
  public user = new User();
  public errorMessage: Observable<string>;
  public loading = false;

  constructor(private store: Store<AuthState>) {
    this.errorMessage = this.store.pipe(select('auth'), mapDistinct(auth => {
      this.loading = false;
      return auth.errorMessage;
    }));
  }

  ngOnInit() {
  }

  public submit (user: User): void {
    this.loading = true;
    this.store.dispatch(new LogIn(user));
  }

}
