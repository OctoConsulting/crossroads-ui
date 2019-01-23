import { Component, OnInit } from '@angular/core';
import { EvidenceElement } from '../../batch-display/batch-display.component';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-evidence-table',
  templateUrl: './evidence-table.component.html',
  styleUrls: ['./evidence-table.component.scss']
})
export class EvidenceTableComponent implements OnInit {

  public evidence: Observable<EvidenceElement[]>;
  public evidenceColumns: string[] = [ 'evidence', 'evidence1B', 'description', 'status', 'evidenceSubmissionId'];
  public batchId: number;

  constructor(public dashboardService: DashboardService,
    public router: Router,
    public route: ActivatedRoute) { }

  public ngOnInit() {
    this.getBatch();
  }

  public getBatch(): void {
    this.evidence = this.route.params
      .pipe(
        map(param => param.id),
        switchMap(id => this.getEvidence(id))
      );
  }

  public getEvidence(row): Observable<any> {
    return this.dashboardService
      .getEvidenceData(row)
      .pipe(
        map(this.getEvidenceResponseData),
        catchError(err => [])
      );
  }

  public getEvidenceResponseData(responseData: any): EvidenceElement[] {
    const resultsEmbedded = responseData['_embedded'];
    if (resultsEmbedded) {
      const results = resultsEmbedded['evidenceList'];
      const resultArr: EvidenceElement[] = [];
      for (const result of results) {
       
      }
      return resultArr;
    }
  }

}
