import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, subscribeOn } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable()
export class AuthenticationService {
  constructor(private  httpClient:  HttpClient) {};
  API_URL  =  'http://edc-apiapp.t7azxfzhmp.us-west-2.elasticbeanstalk.com/travelservice/v1';
  
  baseUrl = environment.baseUrl;
  
  login(user:any,password:any): Observable<any>{
  //   let headers:Headers = new Headers();
  // headers.append("username", user);
  // headers.append("password", password);
  console.log(this.baseUrl);
  let headers = new HttpHeaders({
    'Content-Type': 'application/json'
   });
let options = { headers: headers };
    console.log("inside login");
   if(window.location.href.includes("ec2-35-163-113-234")){
    this.API_URL = this.baseUrl;
   }

    return  this.httpClient.post(`${this.API_URL}/authenticate/user`,null, {
      headers: {'username':user,'password':password, 'Content-type':'application/json', 'Access-Control-Allow-Origin': '*'},
      observe: 'response'
   }).pipe(map(data => {
      
      console.log(data);
     // console.log(data.headers);
      
      
      // localStorage.setItem('loginUserName',data["username"])
      // localStorage.setItem('currentUser', JSON.stringify(data));
      return data;
   }));
  }
}


