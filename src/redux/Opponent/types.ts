export interface OpponentState {
  type: OpponentType;
  uuid: string;
  isReady: boolean;
}

export enum OpponentType {
  AI = 'AI',
  Human = 'Human',
}
