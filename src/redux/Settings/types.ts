export interface SettingsState {
  isOpen: boolean;
  type: SettingsType;
  difficulty: DifficultyType;
  useMoveHistory: boolean;
  preferredGameMode: string;
}

export enum DifficultyType {
  Beginner,
  Intermediate,
  Advanced,
}

export enum SettingsType {
  User,
  Game,
}
