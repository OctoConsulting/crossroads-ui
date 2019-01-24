import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import {  MatFormFieldModule,
          MatSelectModule,
          MatInputModule,
          MatButtonModule,
          MatProgressBarModule
        } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TransferComponent } from './transfer.component';
import { TransferRoutingModule } from './transfer-routing.module';
import { TransferFormComponent } from './transfer-form/transfer-form.component';
import { TransferWitnessConfirmationComponent } from './transfer-witness-confirmation/transfer-witness-confirmation.component';
import { TransferService } from 'src/app/services/transfer.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forChild(),
    FormlyMaterialModule,
    TransferRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatProgressBarModule
  ],
  declarations: [
    TransferComponent,
    TransferFormComponent,
    TransferWitnessConfirmationComponent,
  ],
  providers: [
    TransferService
  ]
})
export class TransferModule {}
