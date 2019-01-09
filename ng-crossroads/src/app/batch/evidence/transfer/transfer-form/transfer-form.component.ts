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
  public witnessListOne = [];
  public witnessListTwo = [];
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
        this.form.get('byEmployee').setValue(responses[0][0]);
        this.types = responses[1];
        this.requiredWitnessCount = this.types[0].requiredWitnessCount;
        this.requiredWitnessCount = 2;
        if (this.requiredWitnessCount > 0) {
          this.form.get('witnessOne').setValidators([Validators.required]);
          this.form.get('witnessOnePassword').setValidators([Validators.required]);
          this.getWitnesses('').subscribe(
            response => {
              this.witnessListOne = response;
            }
          );
        }
        if (this.requiredWitnessCount > 1) {
          this.form.get('witnessTwo').setValidators([Validators.required]);
          this.form.get('witnessTwoPassword').setValidators([Validators.required]);
        }
        this.form.get('transferType').setValue(this.types[0]);
        this.labs = responses[2];
        const selectedLab = this.labs.find( lab => lab.isDefault);
        this.form.get('atLab').setValue(selectedLab);
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

  public submit(): void {
    if (this.form.valid) {
      const postBody = this.constructAPICall();
      this.transferService.sendTransferInfo(postBody).subscribe(
        response => {
          //YAY TO DO
        },
        error => {
          //Error handling
        }
      );
    }
  }

  private constructAPICall(): any {
    const form = this.form;
    console.log(form);
    const body = {
      transferTypeCode: form.get('transferType').value.transferTypeCode,
      locationId: form.get('atLab').value.locationId,
      orgId: form.get('atUnit').value.organizationId,
      transferReasonId: form.get('transferReason').value.transferReasonId,
      requiredWitnessCount: this.requiredWitnessCount,
      storageAreaId: form.get('storageArea').value.storageAreaId,
      storageLocation: form.get('storageLocation').value.storageLocationId,
      byEmployee: {
        employeeID: form.get('byEmployee').value.employeeID,
        userName: form.get('byEmployee').value.userName
      },
      witness1: {
        employeeID: form.get('witnessOne').value.employeeID,
        userName: form.get('witnessOne').value.userName
      },
      witness2: {
        employeeID: form.get('witnessTwo').value.employeeID,
        userName: form.get('witnessTwo').value.employeeID
      }
    };
    return body;
  }

  public getEmployeeName(): string {
    const form = this.form.get('byEmployee');
    if (form.value) {
      return form.value.displayName;
    }
    return '';
  }

  private getEmployeeInfo(): Observable<any> {
    return this.transferService.getEmployeeInfo('');
  }

  private getWitnesses(exceptIds: string = ''): Observable<any> {
    return this.transferService.getEmployeeInfo(exceptIds, 'Witness', 'Active');
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
      witnessOne: [null],
      witnessOnePassword: [null],
      witnessTwo: [null],
      witnessTwoPassword: [null]
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
            const selectedUnit = this.units.find( item => item.default);
            this.form.get('atUnit').setValue(selectedUnit);
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
      if (newValue && newValue.employeeID) {
        this.getWitnesses(newValue.employeeID).subscribe(
          response => {
            this.witnessListTwo = response;
          }
        );
      }
    });
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
}
