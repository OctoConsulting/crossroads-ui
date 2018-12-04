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
    type: 'input',
    templateOptions: {
      label: 'By Employee',
      disabled: true
    }
  },
  {
    key: 'emp-password',
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
