import { Component } from '@angular/core';

@Component({
  selector: 'app-batch-display',
  templateUrl: './batch-display.component.html',
  styleUrls: ['./batch-display.component.scss']
})
export class BatchDisplayComponent {

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
        uri: [ 'transfer', 1 ]
      },
      {
        id: 2,
        batchName: 'Batch Name 01',
        evidenceCounts: 100,
        expires: Date.now(),
        uri: [ 'transfer', 2 ]
      },
      {
        id: 3,
        batchName: 'Batch Name 01',
        evidenceCounts: 100,
        expires: Date.now(),
        uri: [ 'transfer', 3 ]
      },
      {
        id: 4,
        batchName: 'Batch Name 01',
        evidenceCounts: 100,
        expires: Date.now(),
        uri: [ 'transfer', 4 ]
      }
    ]
  };

}
