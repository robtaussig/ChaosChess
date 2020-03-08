export interface DashboardState {
  type: string;
}

export enum DashboardTypes {
  MainScreen = 'MainScreen',
  SetUpOpponent = 'SetUpOpponent',
  InGame = 'InGame',
  Settings = 'Settings',
}
