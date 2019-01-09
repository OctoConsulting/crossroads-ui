import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormlyFieldConfig, FormlyField } from '@ngx-formly/core';
import { transferFormFields, TransferForm } from './transferForm/transferForm';
import { Store, select } from '@ngrx/store';
import { AuthState } from 'src/app/store/reducers/auth.reducer';
import { TransferService } from 'src/app/services/transfer.service';
import { switchMap } from 'rxjs/operators';
import { Subscription, forkJoin, Observable, of } from 'rxjs';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss']
})
export class TransferFormComponent implements AfterViewInit, OnInit, OnDestroy {

  public form: FormGroup;
  // public form = new FormGroup({employee: new FormControl({value: '', disabled: true})});
  // public fields: FormlyFieldConfig[] = transferFormFields;
  public employee = {};
  public transferReasons = [];
  public types = [];
  public labs = [];
  public units = [];
  public storageAreas = [];
  public storageLocations = [];
  public requiredWitnessCount = 0;
  public witnesses = [];
  public locationRequired = false;
  public model: TransferForm;
  private store$: Subscription;
  private reasons$: Subscription;
  private types$: Subscription;

  constructor (
    private store: Store<AuthState>,
    private transferService: TransferService,
    private fb: FormBuilder) {}

  public ngOnInit () {
    this.initForm();
    this.initOnChanges();
  }

  public ngAfterViewInit () {
    forkJoin([this.getEmployeeInfo(), this.getTransferTypes(), this.getLabInfo(), this.getTransferReasons()]).subscribe(
      responses => {
        // TODO
        console.log(responses);
        this.form.get('byEmployee').setValue(responses[0]);
        this.types = responses[1];
        this.requiredWitnessCount = this.types[0].requiredWitnessCount;
        // this.requiredWitnessCount = 2;
        this.form.get('transferType').setValue(this.types[0]);
        this.labs = responses[2];
        this.form.get('atLab').setValue(this.labs[0]);
        this.transferReasons = responses[3];
      },
      error => {
        // TODO
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

  public getEmployeeName(): string {
    const form = this.form.get('byEmployee');
    if (form.value && form.value[0]) {
      return form.value[0].displayName;
    }
    return '';
  }

  private getEmployeeInfo(): Observable<any> {
    return this.transferService.getEmployeeInfo('');
  }

  private getTransferTypes(): Observable<any> {
    return this.transferService.getTransferTypes('PS', 'active');
  }

  private getTransferReasons(): Observable<any> {
    return this.transferService.getTransferReasons([], 'Active');
  }

  private getLabInfo(): Observable<any> {
    return this.transferService.getLabInfo('Active');
  }

  private initForm(): void {
    this.form = this.fb.group({
      transferType: [null, Validators.required],
      byEmployee: [null, Validators.required],
      atLab: [null, Validators.required],
      atUnit: [null, Validators.required],
      transferReason: [null],
      employeePassword: [null, Validators.required],
      comments: [null],
      storageArea: [null, Validators.required],
      storageLocation: [null],
      witnessOne: [null, Validators.required],
      witnessOnePassword: [null, Validators.required],
      witnessTwo: [null, Validators.required],
      witnessTwoPassword: [null, Validators.required]
    });
  }

  private initOnChanges(): void {
    this.form.get('transferType').valueChanges.subscribe( newValue => {
      console.log(newValue);
    });

    this.form.get('atLab').valueChanges.subscribe( newValue => {
      if (newValue && newValue.locationId) {
        this.transferService.getUnitInfo(newValue.locationId, 'Active').subscribe(
          response => {
            this.units = response;
            const isSelectedUnit = this.units.find( item => item.default);
            this.form.get('atUnit').setValue(isSelectedUnit);
          }
        );
      } else {
        this.units = [];
        this.form.get('atUnit').reset();
        this.form.get('atUnit').setErrors({'customError': 'Please select a lab'});
      }
    });

    this.form.get('atUnit').valueChanges.subscribe( newValue => {
      if (newValue && newValue.organizationId) {
        const labId = this.form.get('atLab').value.locationId;
        this.transferService.getStorageAreas(labId, newValue.organizationId)
            .subscribe(
              response => {
                this.storageAreas = response;
                if (this.storageAreas) {
                  this.form.get('storageArea').setValue(this.storageAreas[0]);
                }
              }
            );
      } else {
        this.storageAreas = [];
        this.form.get('storageArea').reset();
      }
    });

    this.form.get('storageArea').valueChanges.subscribe( newValue => {
      if (newValue && newValue.storageAreaId) {
        this.transferService.getStorageLocations(newValue.storageAreaId, 'Active')
            .subscribe(
              response => {
                this.storageLocations = response;
                if (this.storageLocations) {
                  this.form.get('storageLocation').setValue(this.storageLocations[0]);
                  this.form.get('storageLocation').setValidators([this.form.get('storageArea').value.requiresLocation ? Validators.required : Validators.nullValidator]);
                  console.log(this.form.get('storageArea'));
                }
              });
      } else {
        this.storageLocations = [];
        this.form.get('storageLocation').reset();
      }
    });

    this.form.get('witnessOne').valueChanges.subscribe( newValue => {
      this.onInputChange();
    });

    this.form.get('witnessTwo').valueChanges.subscribe( newValue => {
      // TO DO
    });
  }

  public onSelect() {
    console.log(this.form.get('transferType'));
  }

  public onInputChange() {
    console.log(this.form.get('employeePassword'));
    const errors = this.form.get('employeePassword').errors;
    if (this.form.get('employeePassword').value !== 'te') {
      this.form.get('employeePassword').setErrors({...errors, ...{'customError': 'Not the right string'}});
    }
  }

  public isThereError(formName: string, errorName: string): boolean {
    let return_val = false;
    const ctrl = this.form.get(formName);
    if (ctrl.hasError(errorName)) {
      return_val = true;
    }
    return return_val;
  }

  public getErrorMessage(formName: string): string {
    let return_val = 'Needs attention!';
    const ctrl = this.form.get(formName);
    if (ctrl.hasError('customError')) {
      return_val = ctrl.errors['customError'];
    }
    return return_val;
  }

  // private _getTransferReasons (): void {
  //   this.reasons$ = this.transferService.getTransferReasonsAsOptions().subscribe(
  //     reasons => {
  //       this.fields = this.fields
  //         .map<FormlyFieldConfig>(field => {
  //           if (field.key === 'reason') {
  //             field.templateOptions.options = reasons;
  //             return field;
  //           } else {
  //             return field;
  //           }
  //       });
  //     }
  //   );
  // }

  // private _getTransferTypes (): void {
  //   this.types$ = this.transferService.getTransferTypesAsOptions().subscribe(
  //     type => {
  //       this.fields = this.fields
  //         .map<FormlyFieldConfig>(field => {
  //           if (field.key === 'type') {
  //             field.templateOptions.options = type;
  //             return field;
  //           } else {
  //             return field;
  //           }
  //       });
  //     }
  //   );
  // }
}
