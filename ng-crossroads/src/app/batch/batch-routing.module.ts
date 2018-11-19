import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BatchComponent } from './batch.component';
import { BatchDisplayComponent } from './batch-display/batch-display.component';

const routes: Routes = [
  {
    path: '',
    component: BatchComponent,
    children: [
      { path: '', component: BatchDisplayComponent },
      { path: 'transfer', loadChildren: './transfer/transfer.module#TransferModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchRoutingModule {}
