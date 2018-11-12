import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BatchComponent } from './batch.component';

const routes: Routes = [
  {
    path: '',
    component: BatchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchRoutingModule {}
