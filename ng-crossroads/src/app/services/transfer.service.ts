import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class TransferService {
  API_URL = 'http://crossapi.us-west-1.elasticbeanstalk.com/crossroads';
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  public getEmployeeById(empid: string): Observable<any> {
    const apiUrl = this.API_URL + '/v1/employee';

    return this.httpClient
    .get(apiUrl,
      {
        params: {
          ids: empid,
        }
      }
    )
    .pipe(
      map((response: any) => response
        && response._embedded
        && response._embedded.employeeList
        && response._embedded.employeeList.length > 0
        && response._embedded.employeeList[0])
    );
  }

  public getTransferReasons(ids?: string[], status?: 'active' | 'inactive'): Observable<any[]> {
    const apiUrl = this.API_URL + '/v1/transferReason';

    return this.httpClient
    .get(apiUrl,
      {
        params: {
          ids: ids,
          status: status
        }
      }
    )
    .pipe(
      map((response: any) => response
        && response._embedded
        && response._embedded.evidenceTransferReasonList)
    );
  }

  public getTransferReasonsAsOptions(ids?: string[], status?: 'active' | 'inactive'): Observable<any[]> {
    return this.getTransferReasons(ids, status).pipe(
      map(
        (reasons: any[]) => reasons.map(
          reason => ({ value: reason.transferReasonId, label: reason.transferReason })
        )
      )
    );
  }

  public getTransferTypes(codes?: string, status?: 'active' | 'inactive'): Observable<any[]> {
    const apiUrl = this.API_URL + '/v1/transferType';

    return this.httpClient
    .get(apiUrl,
      {
        params: {
          codes: '',
          status: status
        }
      }
    )
    .pipe(
      map((response: any) => {
        try {
          return response._embedded.evidenceTransferTypeList;
        } catch (e) {
          throwError(e);
        }
      })
    );
  }

  public getTransferTypesAsOptions(codes?: string, status?: 'active' | 'inactive'): Observable<any[]> {
    return this.getTransferTypes(codes, status).pipe(
      map(
        (types: any[]) => types.map(
          ttype => ({ value: ttype.transferTypeCode, label: ttype.transferType })
        )
      )
    );
  }
}
