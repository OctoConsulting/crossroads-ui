import { Component, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material/sidenav';
import { Store, select } from '@ngrx/store';
import { ToggleSidenav, CloseSidenav } from './store/actions/app.actions';
import { AppModelType } from './models/app-model';
import { Observable } from 'rxjs';
import { mapDistinct } from './utilities/mapDistinct';
import { AuthState } from './store/reducers/auth.reducer';

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
  public links: Observable<{title: string, path: string[]}[]>;
  public hasBackdrop: Observable<boolean>;
  public navIcon: Observable<string>;
  public sidenavMode: Observable<string>;
  public sidenavOpened: Observable<boolean>;

  @ViewChild(MatSidenav) public sidenav: MatSidenav;

  constructor (
    public store: Store<{AppModelType, AuthState}>,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {
    /**
     * Sync model with store
     */
    this.model = store.pipe(select('app'));
    this.auth = store.pipe(select('auth'));
    this.auth.subscribe(
      state => console.log(state)
    );
    /**
     * Map model to template properties
     */
    this._mapProperties();
    /**
     * Register bars icon
     */
    iconRegistry.addSvgIcon(
      'bars',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/solid/bars.svg')
    );
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

  private _mapProperties () {
    this.color = this.model.pipe(mapDistinct<string>(model => model.color));
    this.title = this.model.pipe(mapDistinct<string>(model => model.title));
    this.links = this.model.pipe(mapDistinct<{title: string, path: string[]}[]>(model => model.navLinks));
    this.hasBackdrop = this.model.pipe(mapDistinct<boolean>(model => model.hasBackdrop));
    this.navIcon = this.model.pipe(mapDistinct<string>(model => model.navIcon));
    this.sidenavMode = this.model.pipe(mapDistinct<string>(model => model.sidenavMode));
    this.sidenavOpened = this.model.pipe(mapDistinct<boolean>(model => model.sidenavOpened));
  }

  private _setupSidenavSubscriptions () {
    this.sidenavOpened.subscribe(
      opened => {
        opened ? this.sidenav.open() : this.sidenav.close();
      }
    );
  }
}
