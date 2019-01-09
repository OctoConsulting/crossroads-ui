import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class TransferService {
  LOCAL_API_URL = 'http://localhost:8080/crossroads';
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  public getEmployeeInfo(exceptIds: string = '', mode: string = 'loggedInUser', status: string = 'Everything'): Observable<any> {
    const API_URL = this.LOCAL_API_URL + '/v1/employee';
    const queryParams = {
      exceptIds: exceptIds,
      mode : mode,
      status : status
    };

    return this.httpClient.get(API_URL, {params: queryParams})
              .pipe(
                map( response => {
                  try {
                    return response['_embedded']['employeeList'];
                  } catch (e) {
                    throwError(e);
                  }
                })
              );
  }

  public getTransferTypes(codes?: string, status?: 'active' | 'inactive'): Observable<any[]> {
    const apiUrl = this.LOCAL_API_URL + '/v1/transferType';
    const queryParams = {
      codes: codes,
      status: status
    };
    return this.httpClient
    .get(apiUrl, {params: queryParams})
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

  public getLabInfo(status: string = 'Active'): Observable<any> {
    const apiUrl = this.LOCAL_API_URL + '/v1/location/AtLab';
    const queryParams = {
      status: status
    };
    return this.httpClient
    .get(apiUrl, {params: queryParams})
    .pipe(
      map((response: any) => {
        try {
          return response._embedded.locationList;
        } catch (e) {
          throwError(e);
        }
      })
    );
  }

  public getUnitInfo(locationId: string, status: string = 'Active'): Observable<any> {
    const apiUrl = this.LOCAL_API_URL + '/v1/location/AtUnit';
    const queryParams = {
      locationId: locationId,
      status: status
    };
    return this.httpClient
    .get(apiUrl, {params: queryParams})
    .pipe(
      map((response: any) => {
        try {
          return response._embedded.organizationList;
        } catch (e) {
          throwError(e);
        }
      })
    );
  }

  public getStorageAreas(atLabId: string, atUnitId: string, status: string = 'Active'): Observable<any> {
    const apiUrl = this.LOCAL_API_URL + '/v1/custody/area';
    const queryParams = {
      atLabId: atLabId,
      atUnitId: atUnitId,
      status: status
    };
    return this.httpClient
    .get(apiUrl, {params: queryParams})
    .pipe(
      map((response: any) => {
        try {
          return response._embedded.custodyAreaList;
        } catch (e) {
          throwError(e);
        }
      })
    );
  }

  public getStorageLocations(storageAreaId: string, status: string = 'Active'): Observable<any> {
    const apiUrl = this.LOCAL_API_URL + '/v1/custody/location';
    const queryParams = {
      custodyAreaId: storageAreaId,
      status: status
    };
    return this.httpClient
    .get(apiUrl, {params: queryParams})
    .pipe(
      map((response: any) => {
        try {
          return response._embedded.custodyLocationList;
        } catch (e) {
          throwError(e);
        }
      })
    );
  }

  public getEmployeeById(empid: string): Observable<any> {
    const apiUrl = this.LOCAL_API_URL + '/v1/employee';

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

  public getTransferReasons(ids?: string[], status?: 'Active' | 'Inactive'): Observable<any[]> {
    const apiUrl = this.LOCAL_API_URL + '/v1/transferReason';

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
      map((response: any) => {
        try {
          return response._embedded.evidenceTransferReasonList;
        } catch (e) {
          throwError(e);
        }
      }
    ));
  }

  public sendTransferInfo(body: any): Observable<any> {
    const apiUrl = this.LOCAL_API_URL + '/transfer';

    return this.httpClient
    .post(apiUrl, body)
    .pipe(
      map((response: any) => {
        try {
          return response._embedded;
        } catch (e) {
          throwError(e);
        }
      }
    ));
  }
}
