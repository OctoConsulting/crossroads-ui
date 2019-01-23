import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class DashboardService {
  constructor(private httpClient: HttpClient) { };
  API_URL = environment.baseUrl;

  baseUrl = environment.baseUrl;
  getDashboardData(empid: string,days: string ,pageNum : string, limit : string ,orderBy:string,sortBy: string,searchString?: any) {
    let apiUrl = this.API_URL+"/v1/batch";
    const headers = new HttpHeaders({'x-auth-token':localStorage.getItem('token')});
      return  this.httpClient.get(apiUrl,
     
        {
          headers : headers,
          params: {
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

  getEvidenceData(batchId: string) {
      let apiUrl = this.API_URL+"/v1/evidence";
      const headers = new HttpHeaders({'x-auth-token':localStorage.getItem('token')});
      
      return  this.httpClient.get(apiUrl,
        {
          headers : headers,
          params: {
          batchId: batchId,
          hierarchy: "false"
        }
      }
    ).pipe(map(data => {
              return data;
    }));
  }

  getEvidenceHierarchyData(evidenceSubmissionID: any){
      let apiUrl = this.API_URL+"/v1/evidence/hierarchy";
      const headers = new HttpHeaders({'x-auth-token':localStorage.getItem('token')});
      
      return  this.httpClient.get(apiUrl,
        {
          headers : headers,
          params: {
          evidenceSubmissionId: evidenceSubmissionID
        }
      }
    ).pipe(map(data => {
              return data;
    }));
  }
}
