import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import {routing} from "./app.routing";
import {AuthenticationService} from "./service/auth.service";
import {DashboardService} from "./service/dashboard.service";
import {RequestService} from "./service/request.service";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AddUserComponent } from './add-user/add-user.component';
import { BannerComponent } from './banner/banner.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import {ListUserComponent} from "./list-user/list-user.component";
import {UserService} from "./service/user.service";
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestTravelComponent } from './request-travel/request-travel.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MatButtonModule, MatCheckboxModule, MatTableModule, 
  MatFormFieldModule,MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatExpansionModule,
  MatSlideToggleModule,
MatInputModule} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { CookieService } from 'ngx-cookie-service';
import { RequestComponent } from './request/request.component';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    BannerComponent,
    LoginComponent,
    ListUserComponent,
    AddUserComponent,
    EditUserComponent,
    DashboardComponent,
    RequestTravelComponent,
    RequestComponent,
    LogoutComponent,

    
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule, 
    MatCheckboxModule, 
    MatGridListModule,
    MatCardModule, 
    MatMenuModule, 
    MatIconModule, 
    LayoutModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatInputModule,
    FormsModule
  ],
  
  providers: [AuthenticationService, UserService,DashboardService,CookieService,RequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
