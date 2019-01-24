import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: 'transfer.component.html',
  styleUrls: ['transfer.component.scss']
})
export class TransferComponent {
  public batchName: string = '';
  constructor(private route: ActivatedRoute) {
    this.batchName = this.route.snapshot.queryParams['name'];
  }
}
