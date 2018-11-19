import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../service/auth.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private authService: AuthenticationService) { }
   
  isLoggedIn:boolean = true;

  ngOnInit() {
    // this.isLoggedIn = localStorage.getItem('LoginUserName')?true:false;
    this.isLoggedIn = localStorage.getItem('LoginUserName')?true:false;
  }

  logout() {
    localStorage.removeItem('LoginUserName');
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/');
    //this.isLoggedIn = false;
  }

}
