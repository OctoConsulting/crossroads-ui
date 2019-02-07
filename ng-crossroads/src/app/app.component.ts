import { Component, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Store, select } from '@ngrx/store';
import { ToggleSidenav, CloseSidenav } from './store/actions/app.actions';
import { AppModelType, NavLink } from './models/app-model';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { mapDistinct } from './utilities/mapDistinct';
import { AuthState } from './store/reducers/auth.reducer';
import { GetStatus, LogOut } from './store/actions/auth.actions';
import { showAuthenticatedLinks } from './store/selectors/selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  public auth: Observable<AuthState>;
  public model: Observable<AppModelType>;
  public color: Observable<string>;
  public title: Observable<string>;
  public links: Observable<NavLink[]>;
  public hasBackdrop: Observable<boolean>;
  public navIcon: Observable<string>;
  public sidenavMode: Observable<string>;
  public sidenavOpened: Observable<boolean>;
  public displayName: Observable<string>;

  @ViewChild(MatSidenav) public sidenav: MatSidenav;

  constructor (
    private router: Router,
    private store: Store<{app: AppModelType, auth: AuthState}>,
    private cdr: ChangeDetectorRef) {
    /**
     * Check if user has valid token
     */
    this.store.dispatch(new GetStatus());
    /**
     * Sync model with store
     */
    this.model = store.pipe(select('app'));
    this.auth = store.pipe(select('auth'));
    this.links = store.pipe(select(showAuthenticatedLinks));
    this.auth.pipe(
      mapDistinct<boolean>(model => model.token),
      first()
    )
    .subscribe(
      token => !!token ? this.router.navigate(['/batches']) : null
    );
    /**
     * Map model to template properties
     */
    this._mapProperties();
  }


  public ngAfterViewInit () {
    this._setupSidenavSubscriptions();
  }

  public toggleSidenav () {
    this.store.dispatch(new ToggleSidenav());
  }

  public closeSidenav () {
    this.store.dispatch(new CloseSidenav());
  }

  public logout (link: NavLink) {
    if (link.title === 'Logout') {
      this.store.dispatch(new LogOut());
    }
  }

  public formatName(arg: string): string {
    if (arg && arg.length > 0) {
      const arr = arg.split(',');
      return arr[1].trim() + ' ' + arr[0].trim();
    }
    return '';
  }

  private _mapProperties () {
    this.color = this.model.pipe(mapDistinct<string>(model => model.color));
    this.title = this.model.pipe(mapDistinct<string>(model => model.title));
    this.hasBackdrop = this.model.pipe(mapDistinct<boolean>(model => model.hasBackdrop));
    this.sidenavMode = this.model.pipe(mapDistinct<string>(model => model.sidenavMode));
    this.sidenavOpened = this.model.pipe(mapDistinct<boolean>(model => model.sidenavOpened));
    this.displayName = this.auth.pipe(mapDistinct<string>(model =>  model.user && model.user.displayName));
  }

  private _setupSidenavSubscriptions () {
    this.sidenavOpened.subscribe(
      opened => {
        opened ? this.sidenav.open() : this.sidenav.close();
        this.cdr.detectChanges();
      }
    );
  }
}
