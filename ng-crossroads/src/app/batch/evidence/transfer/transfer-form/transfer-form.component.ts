import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormlyFieldConfig, FormlyField } from '@ngx-formly/core';
import { transferFormFields, TransferForm } from './transferForm/transferForm';
import { Store, select } from '@ngrx/store';
import { AuthState } from 'src/app/store/reducers/auth.reducer';
import { TransferService } from 'src/app/services/transfer.service';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss']
})
export class TransferFormComponent implements AfterViewInit, OnInit, OnDestroy {

  public form = new FormGroup({employee: new FormControl({value: '', disabled: true})});
  public fields: FormlyFieldConfig[] = transferFormFields;
  public model: TransferForm;
  private store$: Subscription;
  private reasons$: Subscription;
  private types$: Subscription;

  constructor (private store: Store<AuthState>, private transferService: TransferService) {}

  public ngOnInit () {
    this._getTransferReasons();
    this._getTransferTypes();
  }

  public ngAfterViewInit () {
    this.form.valueChanges.subscribe(val => console.log(val));

    this.store$ = this.store.pipe(
      select('auth'),
      switchMap(auth => this.transferService.getEmployeeById(auth.user.id)))
      .subscribe(
        employee => {
          this.form.get('employee').setValue(employee.displayName);
        }
      );
  }

  public ngOnDestroy () {
    this.store$.unsubscribe();
    this.reasons$.unsubscribe();
    this.types$.unsubscribe();
  }

  public submit (model) {
    console.log(model);
  }

  private _getTransferReasons (): void {
    this.reasons$ = this.transferService.getTransferReasonsAsOptions().subscribe(
      reasons => {
        this.fields = this.fields
          .map<FormlyFieldConfig>(field => {
            if (field.key === 'reason') {
              field.templateOptions.options = reasons;
              return field;
            } else {
              return field;
            }
        });
      }
    );
  }

  private _getTransferTypes (): void {
    this.types$ = this.transferService.getTransferTypesAsOptions().subscribe(
      type => {
        this.fields = this.fields
          .map<FormlyFieldConfig>(field => {
            if (field.key === 'type') {
              field.templateOptions.options = type;
              return field;
            } else {
              return field;
            }
        });
      }
    );
  }
}
