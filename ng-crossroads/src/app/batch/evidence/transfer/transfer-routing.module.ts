import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferComponent } from './transfer.component';
import { TransferFormComponent } from './transfer-form/transfer-form.component';
import { TransferWitnessConfirmationComponent } from './transfer-witness-confirmation/transfer-witness-confirmation.component';

const routes: Routes = [
  {
    path: '',
    component: TransferComponent,
    children: [
      { path: '', component: TransferFormComponent },
      { path: 'confirm/:id', component: TransferWitnessConfirmationComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class TransferRoutingModule {}
