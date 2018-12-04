import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvidenceComponent } from './evidence.component';
import { EvidenceRoutingModule } from './evidence-routing.module';
import { EvidenceTableComponent } from './evidence-table/evidence-table.component';
import { MatTableModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    EvidenceRoutingModule,
    MatTableModule
  ],
  declarations: [ EvidenceComponent, EvidenceTableComponent ]
})
export class EvidenceModule {}
