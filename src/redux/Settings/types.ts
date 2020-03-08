export interface SettingsState {
  isOpen: boolean;
  type: SettingsType;
}

export enum SettingsType {
  User,
  Game,
}
