import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../service/auth.service";
import { map } from 'rxjs/operators';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService,
    config: NgbModalConfig, private modalService: NgbModal) {
      config.backdrop = 'static';
      config.keyboard = false;
     }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    if(this.loginForm.controls.email.value && this.loginForm.controls.password.value) {

    this.authService.login(this.loginForm.controls.email.value,this.loginForm.controls.password.value).subscribe((response) => {

    
          let responseBody = response["body"];
          localStorage.setItem('LoginUserName',responseBody["id"]);
         
      
          localStorage.setItem('currentUser', JSON.stringify(response["body"]));
      
          console.log("localstorage :: " + localStorage.getItem('LoginUserName'));
          console.log("localstorage :: " + localStorage.getItem('currentUser'));
        this.router.navigate(['dashboard']);

    },
    error => {
        console.log( error);
        this.invalidLogin = true;
    });

    }else {
      this.invalidLogin = true;
    }
  }

  ngOnInit() {

    localStorage.removeItem('LoginUserName');
    localStorage.removeItem('currentUser');
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  open(content) {
    this.modalService.open(content);
  }


}
