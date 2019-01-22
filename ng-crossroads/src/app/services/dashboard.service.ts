import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class DashboardService {
  constructor(private httpClient: HttpClient) { };
  API_URL = environment.baseUrl;

  baseUrl = environment.baseUrl;
  getDashboardData(empid: string, days: string, pageNum: string, limit: string, orderBy: string, sortBy: string, searchString?: any) {
    const apiUrl = this.API_URL + '/v1/batch';

    return this.httpClient.get(apiUrl,
      {
        params: {
          employeeId: empid,
          days: days,
          orderBy: orderBy,
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
    const apiUrl = this.API_URL + '/v1/evidence';

    return this.httpClient.get(apiUrl,
      {
        params: {
          batchId: batchId
        }
      }
    ).pipe(map(data => {
      return data;
    }));
  }
}
