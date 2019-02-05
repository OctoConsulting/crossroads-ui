import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OpenSidenav } from '../store/actions/app.actions';
import { AppModelType } from '../models/app-model';
import { AuthState } from '../store/reducers/auth.reducer';

@Component({
  templateUrl: 'batch.component.html'
})
export class BatchComponent implements OnInit {
  constructor(
    private store: Store<{app: AppModelType, auth: AuthState}>
  ) {
  }

  ngOnInit() {
    this.openSidenav();
  }

  public openSidenav () {
    this.store.dispatch(new OpenSidenav());
  }
}
