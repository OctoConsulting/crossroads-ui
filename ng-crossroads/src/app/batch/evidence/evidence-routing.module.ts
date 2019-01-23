import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EvidenceComponent } from './evidence.component';

const routes: Routes = [
  {
    path: '',
    component: EvidenceComponent,
    children: [
      { path: 'transfer', loadChildren: './transfer/transfer.module#TransferModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvidenceRoutingModule {}
