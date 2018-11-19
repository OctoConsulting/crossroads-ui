import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { transferFormFields } from './transferForm/transferForm';

@Component({
  templateUrl: 'transfer.component.html'
})
export class TransferComponent {

  public form = new FormGroup({});
  public fields: FormlyFieldConfig[] = transferFormFields;
  public model: any = {};

  public submit (model) {
    console.log(model);
  }
}
