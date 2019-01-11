import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class DashboardService {
  constructor(private  httpClient:  HttpClient) {};
  API_URL  =  'http://crossapi.us-west-1.elasticbeanstalk.com/crossroads';
  
  baseUrl = environment.baseUrl;
  getDashboardData(empid: string,days: string ,pageNum : string, limit : string ,orderBy:string,sortBy: string,searchString?: any){
      let apiUrl = this.API_URL+"/v1/batch";
      
      return  this.httpClient.get(apiUrl,
        {params: {
          employeeId: empid,
          days:days,
          orderBy:orderBy,
          sortBy: sortBy,
          pageNum: pageNum,
          limit: limit
        }
      }
    ).pipe(map(data => {
              return data;
    }));
  }

  getEvidenceData(batchId: string){
      let apiUrl = this.API_URL+"/v1/evidence";
      
      return  this.httpClient.get(apiUrl,
        {params: {
          batchId: batchId
        }
      }
    ).pipe(map(data => {
              return data;
    }));
  }
}