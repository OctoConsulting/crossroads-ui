import { FormlyFieldConfig } from '@ngx-formly/core';

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
    type: 'select',
    templateOptions: {
      label: 'By Employee',
      options: [
        { value: 'test', label: 'test' },
        { value: 'test', label: 'test' },
        { value: 'test', label: 'test' },
        { value: 'test', label: 'test' }
      ]
    }
  },
  {
    key: 'emp-password',
    type: 'input',
    templateOptions: {
      label: 'Employee Password'
    }
  }
];
