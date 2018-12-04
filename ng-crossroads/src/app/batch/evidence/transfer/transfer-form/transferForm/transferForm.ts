import { FormlyFieldConfig } from '@ngx-formly/core';

export interface TransferForm {
  type?: any;
  reason?: any;
  employee?: any;
  empPassword?: any;
  lab?: any;
  unit?: any;
}

export const transferFormFields: FormlyFieldConfig[] = [
  {
    key: 'type',
    type: 'select',
    templateOptions: {
      label: 'Transfer Type',
      options: [
        { value: 'test', label: 'test' },
        { value: 'test', label: 'test' },
        { value: 'test', label: 'test' },
        { value: 'test', label: 'test' }
      ]
    }
  },
  {
    key: 'reason',
    type: 'select',
    templateOptions: {
      label: 'Transfer Reason',
      options: [
        { value: 'test', label: 'test' },
        { value: 'test', label: 'test' },
        { value: 'test', label: 'test' },
        { value: 'test', label: 'test' }
      ]
    }
  },
  {
    key: 'employee',
    type: 'input',
    templateOptions: {
      label: 'By Employee',
    }
  },
  {
    key: 'empPassword',
    type: 'input',
    templateOptions: {
      label: 'Employee Password'
    }
  },
  {
    key: 'lab',
    type: 'select',
    templateOptions: {
      label: 'At Lab',
      options: [
        { value: 'test', label: 'test' },
        { value: 'test', label: 'test' },
        { value: 'test', label: 'test' },
        { value: 'test', label: 'test' }
      ]
    }
  },
  {
    key: 'unit',
    type: 'select',
    templateOptions: {
      label: 'At Unit',
      options: [
        { value: 'test', label: 'test' },
        { value: 'test', label: 'test' },
        { value: 'test', label: 'test' },
        { value: 'test', label: 'test' }
      ]
    }
  }
];
