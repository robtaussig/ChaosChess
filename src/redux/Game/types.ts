export interface GameState {
  stage: GameStages;
  type: GameTypes;
  subType: ChaosGameTypes;
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

export enum ChaosGameTypes {
  Normal = 'Normal',
  RankedChaos = 'RankedChaos',
  SemiChaos = 'SemiChaos',
  SevenKnights = 'SevenKnights',
  Draft = 'Draft',
  None = 'None',
}

export enum BoardTypes {
  Normal = 'Normal',
  Random = 'Random',
  Custom = 'Custom',
}

export type GameStartedPayload = {
  opponent: string;
  isWhite: boolean;
}
