import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map,catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable,throwError } from 'rxjs';

@Injectable()
export class DashboardService {
  constructor(private httpClient: HttpClient) { };
  API_URL = environment.baseUrl;

  getDashboardData(empid: string,days: string ,pageNum : string, limit : string ,orderBy:string,sortBy: string,searchString?: any) {
    let apiUrl = this.API_URL+"/v1/batch";
      return  this.httpClient.get(apiUrl,
     
        {
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
      
      return  this.httpClient.get(apiUrl,
        {
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
      
      return  this.httpClient.get(apiUrl,
        {
          params: {
          evidenceSubmissionId: evidenceSubmissionID
        }
      }
    ).pipe(map(data => {
              return data;
    }));
  }

  getValidateTransferOut(custodyAreaId: any): Observable<any> {
    
    let apiUrl = this.API_URL+"/v1/evidencetransfer/validateTransOut";
    
    return  this.httpClient.post(apiUrl,{},
      {
        params: {
          custodyAreaId: custodyAreaId
      }
    }
  ).pipe(map(data => {
    return true;
  }),catchError(this.handleError));
}

private handleError(error: HttpErrorResponse) {
 
  return throwError(
    error);
};
  
}
