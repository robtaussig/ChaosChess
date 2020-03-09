export enum Avatar {
  Boy = 'boy',
  Girl = 'girl',
  Bot = 'bot',
}

export interface UserState {
  avatar: Avatar;
  name: string;
  color: Color;
}

export enum Color {
  White = '0',
  Black = '1',
}
