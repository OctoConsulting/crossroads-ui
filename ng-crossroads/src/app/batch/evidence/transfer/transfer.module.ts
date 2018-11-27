import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

import { TransferComponent } from './transfer.component';
import { TransferRoutingModule } from './transfer-routing.module';
import { TransferFormComponent } from './transfer-form/transfer-form.component';
import { TransferWitnessConfirmationComponent } from './transfer-witness-confirmation/transfer-witness-confirmation.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forChild(),
    FormlyMaterialModule,
    TransferRoutingModule,
  ],
  declarations: [
    TransferComponent,
    TransferFormComponent,
    TransferWitnessConfirmationComponent,
  ]
})
export class TransferModule {}
