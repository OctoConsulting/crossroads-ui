import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private  httpClient:  HttpClient) {}
  API_URL  =  'http://edc-apiapp.t7azxfzhmp.us-west-2.elasticbeanstalk.com/travelservice/v1';
  login(user:any,password:any){
    let headers:Headers = new Headers();
  headers.append("username", user);
  headers.append("password", password);
    console.log("inside login");

    return  this.httpClient.get(`${this.API_URL}/authenticate/user`,{
      headers: {'username':user,'password':password}
   });
  }
}
