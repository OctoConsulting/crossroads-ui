export interface AppModelType {
  navLinks: { title: string, path: string[] }[];
  title: string;
  navIcon: string;
  color: string;
  sidenavMode: string;
  sidenavOpened: boolean;
}

export const appModel: AppModelType = {
  navLinks: [
    { title: 'Login', path: ['/login'] },
    { title: 'Batch', path: ['/batches'] }
  ],
  title: 'FBI CrossRoads',
  navIcon: 'bars',
  color: 'primary',
  sidenavMode: 'side',
  sidenavOpened: false
};
