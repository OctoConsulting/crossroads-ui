import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { MatPaginator, MatSort } from '@angular/material';

export interface BatchElement {
  batchId: any;
  batchName: any;
  employeeId: any;
  evidenceCount: any;
  expires: any;
}

export interface EvidenceElement {
  evidence: any;
  evidence1B: any;
  description: any;
  status: any;
  evidenceSubmissionId: any;
  batchId: any;
}

@Component({
  selector: 'app-batch-display',
  templateUrl: './batch-display.component.html',
  styleUrls: ['./batch-display.component.scss']
})
export class BatchDisplayComponent implements OnInit {

  dataSource: BatchElement[] = [];
  dataSourceEvidence: EvidenceElement[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['batchId', 'batchName', 'employeeId', 'evidenceCount', 'expires'];
  displayedColumnsEvidence: string[] = ['batchId', 'evidence', 'evidence1B', 'description', 'status', 'evidenceSubmissionId'];

  constructor(private formBuilder: FormBuilder, private router: Router, private dashboardService: DashboardService) { }

  public data = '{"data":[  {  "data":{  "name":"Andrew","gender":"Male"}, "children":[{  "data":{   "name":"Andrewson", "gender":"Male"  },"children":[  {  "data":{  "name":"Eric", "gender":"Male"}}        ]}]}]}';

  ngOnInit() {
    this.showDashboard('');
  }

  showDashboard(searchString?: string) {
    // console.log("cookie getall ::: " + JSON.stringify(this.cookieService.getAll()));
    this.dashboardService.getDashboardData('63718', '2000', '1', '10', 'Name', 'ASC').subscribe((response) => {
      console.log(response);
      this.dataSource = this.getBatchData(response);
      return response;
    });

  }

  getBatchData(responseData: any) {
    if (responseData) {
      const results = responseData["batchList"];
      const resultArr: BatchElement[] = [];
      for (const result of results) {
        resultArr.push({
          batchId: result["batchId"], batchName: result["batchName"], employeeId: result["employeeId"],
          evidenceCount: result["evidenceCount"], expires: result["expires"]
        });
      }
      return resultArr;
    }
  }

  getEvidence(row) {
    this.dashboardService.getEvidenceData(row["batchId"]).subscribe((response) => {
      this.dataSourceEvidence = this.getEvidenceResponseData(response);
      return response;
    });
  }

  getEvidenceResponseData(responseData: any) {
    if (responseData) {
      const results = responseData["evidenceList"];
      const resultArr: EvidenceElement[] = [];
      for (const result of results) {
        resultArr.push({
          batchId: result["batchId"], evidence: result["evidence"], evidence1B: result["evidence1B"],
          description: result["description"], status: result["status"],
          evidenceSubmissionId: result["evidenceSubmissionId"]
        });
      }
      return resultArr;
    }
  }
}
