import { Color } from '../../engine/types';

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
