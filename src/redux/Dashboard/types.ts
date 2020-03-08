export interface DashboardState {
  type: DashboardTypes;
}

export enum DashboardTypes {
  MainScreen = 'MainScreen',
  InGame = 'InGame',
  Settings = 'Settings',
}
