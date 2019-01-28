import { User } from '../../models/user';
import { AuthActionTypes, All } from '../actions/auth.actions';


export interface AuthState {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | null;
  // error message
  errorMessage: string | null;
  token?: string;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  errorMessage: null,
  token: null
};

export function authReducer(state = initialState, action: All): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          email: action.payload.email,
          displayName: action.payload.displayName
        },
        errorMessage: null,
        token: action.payload.token
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...initialState,
        errorMessage: 'Incorrect email and/or password.'
      };
    }
    case AuthActionTypes.LOGOUT: {
      return initialState;
    }
    case AuthActionTypes.GET_STATUS: {
      const token = localStorage.getItem('token');
      const displayName = localStorage.getItem('displayName');
      return {
        errorMessage: null,
        isAuthenticated: !!token,
        user: {
          token: token,
          displayName: displayName
        },
        token
      };
    }
    default: {
      return state;
    }
  }
}
