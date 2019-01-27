import { createSelector } from '@ngrx/store';
import { AppModelType, NavLink } from 'src/app/models/app-model';
import { AuthState } from '../reducers/auth.reducer';

const selectAuth = (state: { auth: AuthState, app: AppModelType}) => state.auth.token;
const selectLinks = (state: { auth: AuthState, app: AppModelType}) => state.app.navLinks;
const selectAuthenticatedLinks = (token: string, links: NavLink[]) => {
  if (token) {
    return links.filter(link => link.showWhenAuthenticated);
  } else {
    return links.filter(link => !link.showWhenAuthenticated);
  }
};

export const showAuthenticatedLinks = createSelector(
  selectAuth,
  selectLinks,
  selectAuthenticatedLinks
);
