import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { transferFormFields } from './transferForm/transferForm';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss']
})
export class TransferFormComponent {
  public form = new FormGroup({});
  public fields: FormlyFieldConfig[] = transferFormFields;
  public model: any = {};

  public submit (model) {
    console.log(model);
  }
}
