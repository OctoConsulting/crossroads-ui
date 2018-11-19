import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class RequestService {
  constructor(private  httpClient:  HttpClient) {};
  API_URL  =  'http://edc-apiapp.t7azxfzhmp.us-west-2.elasticbeanstalk.com/travelservice/v1';
  //travelRequest: any = {};
  


  baseUrl = environment.baseUrl;
  newTravelRequestService(travelRequest: any) : Observable<any>{
  //   let headers:Headers = new Headers();
  // headers.append("username", user);
  // headers.append("password", password);
  //console.log(sessionStorage.getItem('SESSION'));
  if(window.location.href.includes("ec2-35-163-113-234")){
    this.API_URL = this.baseUrl;
   }

    return  this.httpClient.post(`${this.API_URL}/travel`,travelRequest
   ).pipe(map(data => {
     console.log(data);
            return data;
   }));
  }
}


