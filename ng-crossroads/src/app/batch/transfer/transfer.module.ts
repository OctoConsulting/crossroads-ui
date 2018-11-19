import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';


import { TransferComponent } from './transfer.component';
import { TransferRoutingModule } from './transfer-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    TransferRoutingModule,
  ],
  declarations: [
    TransferComponent,
  ]
})
export class TransferModule {}
