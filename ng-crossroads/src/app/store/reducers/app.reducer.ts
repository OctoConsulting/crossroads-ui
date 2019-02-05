import { AppActionTypes, AppActionsUnion } from '../actions/app.actions';
import { appModel, AppModelType } from '../../models/app-model';

export function appReducer(state: AppModelType = appModel, action: AppActionsUnion) {
  switch (action.type) {
    case AppActionTypes.ToggleSidenav:
      return Object.assign(
        {},
        state,
        {sidenavOpened: !state.sidenavOpened}
      );
    case AppActionTypes.OpenSidenav:
        return Object.assign(
          {},
          state,
          { sidenavOpened: true }
        );
    case AppActionTypes.CloseSidenav:
      return Object.assign(
        {},
        state,
        { sidenavOpened: false }
      );
    case AppActionTypes.ChangeTheme:
      return Object.assign(
        {},
        state,
        { color: action.payload.color }
      );
    default:
      return state;
  }
}
