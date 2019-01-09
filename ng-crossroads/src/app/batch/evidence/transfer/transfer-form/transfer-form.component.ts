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
  public types = [
    'option 1',
    'option 2',
    'option 3'
  ];
  public witnesses = [
    'Witness name 1',
    'Witness name 2',
    'Witness name 3'
  ];
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
    forkJoin([this.getEmployeeInfo(), this.getTransferTypes(), this.getLabInfo()]).subscribe(
      responses => {
        // TODO
        this.form.get('transferType').setValue(responses[0]);
        this.form.get('byEmployee').setValue(responses[1]);
        this.form.get('atLab').setValue(responses[2]);
      },
      error => {
        // TODO
      }
    );

    this.initOnChanges();
  }

  public ngAfterViewInit () {
    // this.form.valueChanges.subscribe(val => console.log(val));

    // this.store$ = this.store.pipe(
    //   select('auth'),
    //   switchMap(auth => this.transferService.getEmployeeById(auth.user.id)))
    //   .subscribe(
    //     employee => {
    //       this.form.get('employee').setValue(employee.displayName);
    //     }
    //   );
  }

  public ngOnDestroy () {
    this.store$.unsubscribe();
    this.reasons$.unsubscribe();
    this.types$.unsubscribe();
  }

  public submit (model) {
    console.log(model);
  }

  private getEmployeeInfo(): Observable<any> {
    return of([]);
  }

  private getTransferTypes(): Observable<any> {
    return of([]);
  }

  private getLabInfo(): Observable<any> {
    return of([]);
  }

  private initForm(): void {
    this.form = this.fb.group({
      transferType: [null, Validators.required],
      byEmployee: [null, Validators.required],
      atLab: [null, Validators.required],
      atUnit: [null, Validators.required],
      transferReason: [null, Validators.required],
      employeePassword: [null, Validators.required],
      comments: [null],
      storageArea: [null, Validators.required],
      storageLocation: [null, Validators.required],
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
      // TODO
    });

    this.form.get('atUnit').valueChanges.subscribe( newValue => {
      // TODO
    });

    this.form.get('storageArea').valueChanges.subscribe( newValue => {
      // TO DO
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
