import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { merge, Observable, of as observableOf, BehaviorSubject } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MatTreeModule } from '@angular/material/tree';
import { CollectionViewer, SelectionChange } from '@angular/cdk/collections';


export interface BatchElement {
  batchId: any;
  batchName: any;
  evidenceCount: any;
  expires: any;
}

export interface BatchResults {
  items: BatchElement[];
  total_count: number;
}

export interface EvidenceElement {
  level: any;
  evidenceSubmissionId: any;
  evidence: any;
  evidence1B: any;
  description: any;
  location: any;
  status: any;
}

@Component({
  selector: 'app-batch-display',
  templateUrl: './batch-display.component.html',
  styleUrls: ['./batch-display.component.scss']
})
export class BatchDisplayComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private dashboardService: DashboardService) {
  }

  data: BatchElement[] = [];
  dataSourceEvidence: EvidenceElement[] = [];
  isLoadingResults = true;
  resultsLength = 0;
  totalBatchCount = 0;
  selectedRowIndex: number = -1;
  batchRowName: any;
  selectedBatch: BatchElement;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['batchName', 'batchId', 'evidenceCount', 'expires'];
  displayedColumnsEvidence: string[] = ['evidence', 'level', 'evidenceSubmissionId', 'evidence1B', 'description', 'location', 'status'];

  get displayEvidenceElements (): boolean {
    return this.dataSourceEvidence && this.dataSourceEvidence.length > 0;
  }

  ngOnInit() {

    if (this.sort) {
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    }

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this!.showDashboard(this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(result => {
          this.resultsLength = result.total_count;
          return result.items;
        }),
        catchError(() => {
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }

  showPageEvent(event: any) {
    this!.showDashboard(this.sort.active, this.sort.direction, event.pageIndex);
  }

  showDashboard(sort: string, order: string, page: number, searchString?: string): Observable<BatchResults> {
    let pageString = page + 1 + "";
    let result;
    this.dashboardService!.getDashboardData('63718', '90', pageString, '5', 'Name', order ? order : 'desc').subscribe((response) => {
      result = this.getBatchData(response);
      this.data = result.items;
      this.resultsLength = result.total_count;
      return result;

    });

    return result;
  }

  getBatchData(responseData: any) {

    let results = responseData["batchList"];
    let batchResult = {
      items: [],
      total_count: 0
    };
    let resultArr: BatchElement[] = [];
    for (let result of results) {
      resultArr.push({
        batchId: result["batchId"], batchName: result["batchName"],
        evidenceCount: result["evidenceCount"], expires: result["expires"]
      });
    }

    batchResult.items = resultArr;
    batchResult.total_count = responseData["totalCounts"];
    return batchResult;
  }

  getEvidence(row) {
    this.dashboardService.getEvidenceData(row["batchId"]).subscribe((response) => {
      this.dataSourceEvidence = this.getEvidenceResponseData(response, 0);
      return response;
    });
  }

  getEvidenceResponseData(responseData: any, level: any) {
    let resultsEmbedded = responseData["_embedded"];
    if (resultsEmbedded) {
      let results = resultsEmbedded["evidenceList"];
      let resultArr: EvidenceElement[] = [];
      for (let result of results) {
        resultArr.push({
          level: level + 1,
          evidenceSubmissionId: result["evidenceSubmissionId"],
          evidence: result["evidence"], evidence1B: result["evidence1B"],
          description: result["description"], location: result["location"], status: result["status"]
        });
      }
      return resultArr;
    }
  }

  getChildEvidence(row) {
    this.dashboardService.getEvidenceHierarchyData(row["evidenceSubmissionId"]).subscribe((response) => {
      let responseEvidenceData: EvidenceElement[] = [];
      responseEvidenceData = this.getEvidenceResponseData(response, row["level"]);
      let previousData = [...this.dataSourceEvidence];
      this.dataSourceEvidence = [];
      for (let item of previousData) {
        this.dataSourceEvidence.push(item);
        if (item.evidenceSubmissionId == row["evidenceSubmissionId"]) {
          if (responseEvidenceData && responseEvidenceData.length > 0) {
            for (let result of responseEvidenceData) {
              if (!previousData.some((item) => item["evidenceSubmissionId"] == result["evidenceSubmissionId"]))
                this.dataSourceEvidence.push(result);
            }
          }
        }
      }

      this.dataSourceEvidence = [...this.dataSourceEvidence];
      console.log(response);
      return response;
    });
  }

  highlight(row) {
    this.selectedRowIndex = row.batchId;
    this.batchRowName = row.batchName;
  }

  addPadding(padding: any) {
    if (!padding) {
      padding = 0;
    } else {
      padding = padding - 1;
    }

    let styles = {
      'margin-left': padding * 20 + 'px'
    };
    return styles;

  }

  onBatchRowClick(row: BatchElement) {
    this.getEvidence(row);
    this.selectedRowIndex = row.batchId;
    this.batchRowName = row.batchName;
    this.selectedBatch = row;
  }

  isTransferDisabled(): boolean {
    return !this.selectedBatch;
  }

  navigateToBatchTransfer(batch: BatchElement): void {
    this.router.navigate(['batches', batch.batchId, 'transfer']);
  }

}
