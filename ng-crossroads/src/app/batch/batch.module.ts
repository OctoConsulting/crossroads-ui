import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { BatchComponent } from './batch.component';
import { BatchRoutingModule } from './batch-routing.module';
import { BatchDisplayComponent } from './batch-display/batch-display.component';
import { MatSortModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material'


@NgModule({
  declarations: [
    BatchComponent,
    BatchDisplayComponent,
  ],
  imports: [
    CommonModule,
    BatchRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTreeModule,
    MatIconModule,
  ]
})
export class BatchModule { }
