import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchComponent } from './batch.component';
import { BatchRoutingModule } from './batch-routing.module';

@NgModule({
  declarations: [
    BatchComponent
  ],
  imports: [
    CommonModule,
    BatchRoutingModule
  ]
})
export class BatchModule { }
