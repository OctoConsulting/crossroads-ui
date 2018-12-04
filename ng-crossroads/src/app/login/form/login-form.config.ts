import { FormlyFieldConfig } from '@ngx-formly/core';

export const loginForm: FormlyFieldConfig[] = [
  {
    key: 'email',
    type: 'input',
    templateOptions: {
      label: 'Email Address',
      placeholder: 'lynne.johnson@octoconsulting.com'
    }
  },
  {
    key: 'password',
    type: 'input',
    templateOptions: {
      label: 'Password',
      placeholder: 'PW is 1234'
    }
  }
];
