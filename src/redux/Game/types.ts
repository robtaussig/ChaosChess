export interface GameState {
  stage: GameStages;
  type: GameTypes;
  difficulty: number;
}

export enum GameStages {
  NotStarted = 'NotStarted',
  SettingUpAI = 'SettingUpAI',
  SettingUpHuman = 'SettingUpHuman',
  Started = 'Started',
  InProgress = 'InProgress',
}

export enum GameTypes {
  Chaos = 'Chaos',
  Regular = 'Regular',
}

export type GameStartedPayload = {
  opponent: string;
}
