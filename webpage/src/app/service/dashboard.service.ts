import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class DashboardService {
  constructor(private  httpClient:  HttpClient) {};
  API_URL  =  'http://edc-apiapp.t7azxfzhmp.us-west-2.elasticbeanstalk.com/travelservice/v1';
  
  baseUrl = environment.baseUrl;
  getDashboardData(id: number){
    console.log(sessionStorage.getItem('SESSION'));
    if(window.location.href.includes("ec2-35-163-113-234")){
      this.API_URL = this.baseUrl;
    }
      let apiUrl = this.API_URL+"/travel"+"/"+localStorage.getItem("LoginUserName");
      
      return  this.httpClient.get(apiUrl
    ).pipe(map(data => {
      console.log(data);
              return data;
    }));
  }
}


