import { Action } from '@ngrx/store';

export enum AppActionTypes {
  ToggleSidenav = '[App Component] Toggle Sidenav',
  CloseSidenav = '[App Component] Close Sidenav',
  ChangeTheme = '[App Component] Change Theme'
}

export class ToggleSidenav implements Action {
  readonly type = AppActionTypes.ToggleSidenav;
}

export class CloseSidenav implements Action {
  readonly type = AppActionTypes.CloseSidenav;
}

export class ChangeTheme implements Action {
  readonly type = AppActionTypes.ChangeTheme;

  constructor (public payload: { color: string }) {}
}

export type AppActionsUnion = ToggleSidenav | CloseSidenav | ChangeTheme;
