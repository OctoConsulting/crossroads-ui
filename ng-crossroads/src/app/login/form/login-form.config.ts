import { FormlyFieldConfig } from '@ngx-formly/core';

export const loginForm: FormlyFieldConfig[] = [
  {
    key: 'username',
    type: 'input',
    templateOptions: {
      label: 'Username'
    }
  },
  {
    key: 'password',
    type: 'input',
    templateOptions: {
      label: 'Password'
    }
  }
];
