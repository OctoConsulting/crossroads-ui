import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { BatchComponent } from './batch.component';
import { BatchRoutingModule } from './batch-routing.module';
import { BatchDisplayComponent } from './batch-display/batch-display.component';

@NgModule({
  declarations: [
    BatchComponent,
    BatchDisplayComponent,
  ],
  imports: [
    CommonModule,
    BatchRoutingModule,
    MatTableModule
  ]
})
export class BatchModule { }
