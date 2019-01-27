import { FormlyFieldConfig } from '@ngx-formly/core';

export const loginForm: FormlyFieldConfig[] = [
  {
    key: 'email',
    type: 'input',
    templateOptions: {
      label: 'Email Address',
    }
  },
  {
    key: 'password',
    type: 'input',
    templateOptions: {
      label: 'Password',
      type: 'password'
    }
  }
];
