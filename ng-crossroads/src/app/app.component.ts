import { Component, ViewChild, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material/sidenav';
import { Store, select } from '@ngrx/store';
import { ToggleSidenav, CloseSidenav } from './store/actions/app.actions';
import { AppModelType, NavLink } from './models/app-model';
import { Observable } from 'rxjs';
import { mapDistinct } from './utilities/mapDistinct';
import { AuthState } from './store/reducers/auth.reducer';
import { GetStatus, LogOut } from './store/actions/auth.actions';
import { showAuthenticatedLinks } from './store/selectors/selectors';

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

  @ViewChild(MatSidenav) public sidenav: MatSidenav;

  constructor (
    public store: Store<{app: AppModelType, auth: AuthState}>,
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

  private _mapProperties () {
    this.color = this.model.pipe(mapDistinct<string>(model => model.color));
    this.title = this.model.pipe(mapDistinct<string>(model => model.title));
    this.hasBackdrop = this.model.pipe(mapDistinct<boolean>(model => model.hasBackdrop));
    this.sidenavMode = this.model.pipe(mapDistinct<string>(model => model.sidenavMode));
    this.sidenavOpened = this.model.pipe(mapDistinct<boolean>(model => model.sidenavOpened));
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
