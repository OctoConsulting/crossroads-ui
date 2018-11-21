import { Component } from '@angular/core';

@Component({
  selector: 'app-evidence-table',
  templateUrl: './evidence-table.component.html',
  styleUrls: ['./evidence-table.component.scss']
})
export class EvidenceTableComponent {

  public table = {
    headers: [
      { name: 'Batch ID' },
      { name: 'Batch Name' },
      { name: 'Evidence Counts' },
      { name: 'Expires' }
    ],
    rows: [
      {
        id: 1,
        batchName: 'Batch Name 01',
        evidenceCounts: 100,
        expires: Date.now(),
      },
      {
        id: 2,
        batchName: 'Batch Name 01',
        evidenceCounts: 100,
        expires: Date.now()
      },
      {
        id: 3,
        batchName: 'Batch Name 01',
        evidenceCounts: 100,
        expires: Date.now()
      },
      {
        id: 4,
        batchName: 'Batch Name 01',
        evidenceCounts: 100,
        expires: Date.now()
      }
    ]
  };

}
