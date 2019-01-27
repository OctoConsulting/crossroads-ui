export interface NavLink {
  title: string;
  path: string[];
  showWhenAuthenticated: boolean;
}

export interface AppModelType {
  navLinks: NavLink[];
  title: string;
  navIcon: string;
  color: string;
  sidenavMode: string;
  sidenavOpened: boolean;
}

export const appModel: AppModelType = {
  navLinks: [
    { title: 'Login', path: ['/login'], showWhenAuthenticated: false },
    { title: 'Batch', path: ['/batches'], showWhenAuthenticated: true },
    { title: 'Logout', path: ['/'], showWhenAuthenticated: true },
  ],
  title: 'FBI CrossRoads',
  navIcon: 'bars',
  color: 'primary',
  sidenavMode: 'side',
  sidenavOpened: true
};
