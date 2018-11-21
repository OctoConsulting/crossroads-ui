import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EvidenceComponent } from './evidence.component';
import { EvidenceTableComponent } from './evidence-table/evidence-table.component';


const routes: Routes = [
  {
    path: '',
    component: EvidenceComponent,
    children: [
      { path: '', component: EvidenceTableComponent },
      { path: 'transfer', loadChildren: './transfer/transfer.module#TransferModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvidenceRoutingModule {}
