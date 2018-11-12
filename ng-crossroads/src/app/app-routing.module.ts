import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'batch', loadChildren: './batch/batch.module#BatchModule' },
  { path: 'transfer', loadChildren: './transfer/transfer.module#TransferModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
