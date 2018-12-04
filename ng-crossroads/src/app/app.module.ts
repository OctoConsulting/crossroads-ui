import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/reducers/app.reducer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { AuthService } from './services/auth.service';
import { DashboardService } from './services/dashboard.service';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { TokenInterceptor, ErrorInterceptor } from './services/token.interceptor';
import { authReducer } from './store/reducers/auth.reducer';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyMaterialModule,
    StoreModule.forRoot({ app: appReducer, auth: authReducer }),
    EffectsModule.forRoot([AuthEffects]),
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    HttpClientModule,
    MatListModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    DashboardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
