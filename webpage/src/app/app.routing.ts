import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AddUserComponent} from "./add-user/add-user.component";
import {ListUserComponent} from "./list-user/list-user.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestComponent } from './request/request.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'list-user', component: ListUserComponent },
  { path: 'edit-user', component: EditUserComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'request', component: RequestComponent},
  {path : '', component : LoginComponent}
];

export const routing = RouterModule.forRoot(routes);
