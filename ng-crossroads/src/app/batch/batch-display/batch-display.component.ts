import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { merge, Observable, of as observableOf, BehaviorSubject } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

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
  hasChildren : any;
  expanded : any;
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

  constructor(private formBuilder: FormBuilder,
            private router: Router,
            private route: ActivatedRoute,
            private dashboardService: DashboardService,
            private toastr: ToastrService) {

  }

  data: BatchElement[] = [];
  dataSourceEvidence: EvidenceElement[] = [];
  isLoadingResults = true;
  loadingBatch = false;
  loadingEvidence = true;
  resultsLength = 0;
  totalBatchCount = 0;
  selectedRowIndex: number = -1;
  selectedBatch: BatchElement;
  batchRowName: any;
  currentPage: 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['batchName', 'batchId', 'evidenceCount', 'expires'];
  displayedColumnsEvidence: string[] = ['evidence', 'level', 'evidenceSubmissionId', 'evidence1B', 'description', 'location', 'status','hasChildren','expanded'];

  get displayEvidenceElements(): boolean {
    return this.dataSourceEvidence && this.dataSourceEvidence.length > 0;
  }

  ngOnInit() {
    // console.log(this.route.snapshot.queryParams);
    if (this.route.snapshot.queryParams['name']) {
      this.displaySuccessBanner();
    }

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
    this.currentPage = event.pageIndex;
    this!.showDashboard(this.sort.active, this.sort.direction, event.pageIndex);
  }

  showDashboard(sort: string, order: string, page: number, searchString?: string): Observable<BatchResults> {
    let pageString = page + 1 + "";
    let result;
    this.loadingBatch = true;
    this.dashboardService!.getDashboardData('63718', '90', pageString, '5', 'Name', order ? order : 'desc').subscribe((response) => {
      result = this.getBatchData(response);
      this.data = result.items;
      this.resultsLength = result.total_count;
      this.loadingBatch = false;
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
    this.loadingEvidence = true;
    this.dashboardService.getEvidenceData(row["batchId"]).subscribe((response) => {
      this.dataSourceEvidence = this.getEvidenceResponseData(response, 0);
      this.loadingEvidence = false;
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
          description: result["description"], location: result["area"]?result["area"]+":"+result["location"]:result["location"], status: result["status"],
          hasChildren: result["hasChildren"]>0?true:false,
          expanded : false
        });
      }
      return resultArr;
    }
  }

  getChildEvidence(row) {
    this.loadingEvidence = true;
    this.dashboardService.getEvidenceHierarchyData(row["evidenceSubmissionId"]).subscribe((response) => {
      let responseEvidenceData: EvidenceElement[] = [];
      responseEvidenceData = this.getEvidenceResponseData(response, row["level"]);
      let previousData = [...this.dataSourceEvidence];
      this.dataSourceEvidence = [];
      for (let item of previousData) {
        this.dataSourceEvidence.push(item);
        if (item.evidenceSubmissionId == row["evidenceSubmissionId"]) {
            item.expanded = true
          if (responseEvidenceData && responseEvidenceData.length > 0) {
            for (let result of responseEvidenceData) {
              if (!previousData.some((item) => item["evidenceSubmissionId"] == result["evidenceSubmissionId"]))
                this.dataSourceEvidence.push(result);
            }
          }
        }
      }

      this.dataSourceEvidence = [...this.dataSourceEvidence];
      this.loadingEvidence = false;
      return response;
    });
  }

  removeChildEvidence(row) {
    this.loadingEvidence = true;
    this.dashboardService.getEvidenceHierarchyData(row["evidenceSubmissionId"]).subscribe((response) => {
      let responseEvidenceData: EvidenceElement[] = [];
      responseEvidenceData = this.getEvidenceResponseData(response, row["level"]);
      let previousData = [...this.dataSourceEvidence];
      this.dataSourceEvidence = [];
      let isRemoveChild:boolean = false;
      for (let item of previousData) {
        if(isRemoveChild){
          if(item.level>row["level"]) {
            previousData = previousData.filter(data => data["evidenceSubmissionId"] !== item["evidenceSubmissionId"]);
          } else {
            isRemoveChild = false;
          }
        }
        if (item.evidenceSubmissionId == row["evidenceSubmissionId"]) {
          item.expanded = false;
          if (responseEvidenceData && responseEvidenceData.length > 0) {
            isRemoveChild = true;
            for (let result of responseEvidenceData) {
              if (previousData.some((item) => item["evidenceSubmissionId"] == result["evidenceSubmissionId"]))
                previousData = previousData.filter(item => item["evidenceSubmissionId"] !== result["evidenceSubmissionId"]);
            }
          }
        }
      }

      this.dataSourceEvidence = [...previousData];
      this.loadingEvidence = false;
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
    this.router.navigate(['batches', batch.batchId, 'transfer'], {queryParams: {name: batch.batchName}});
  }

  sortData(sort: any) {
    this!.showDashboard(sort.active, sort.direction, 0);
  }

  displaySuccessBanner(): void {
    const successInfo = this.route.snapshot.queryParams;
    // console.log(successInfo);
    setTimeout(() => {
      this.toastr
        .success(`Batch ${successInfo['name']} was successfully transferred to ${successInfo['storageArea']}`, 'Success!', {
        closeButton: true,
        disableTimeOut: true,
        easing: 'ease-in'
      }).onHidden.subscribe( action => {
        this.router.navigate(['/batches'], {queryParams: {}});
      });
    });
  }

}
