export interface GameState {
  stage: GameStages;
}

export enum GameStages {
  NotStarted = 'NotStarted',
  Started = 'Started',
}

export type GameStartedPayload = {
  opponent: string;
}
