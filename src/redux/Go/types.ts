import { Color } from '../../goEngine/types';

export interface GoState {
    board: string;
    initialBoard: string;
    legalMoves: number[];
    lastRejectedMove: number;
    turnsElapsed: number;
    lastMove: number;
    history: string[];
    zones: CapturedZones;
    winner: string;
    points: { white: number, black: number };
    goRoom: string;
    goId: string;
    userColor: Color;
    opponent: string;
    difficulty: number;
}

export type MakeMovePayload = {
    board: string;
    legalMoves: number[];
    move: number;
    broadcast?: (action: string) => void;
    goOpponent?: string;
}

export interface CapturedZones {
    [pos: number]: string;
}

export type GameOverPayload = {
    winner: string;
    zones: CapturedZones;
    points: { white: number, black: number };
    broadcast?: (action: string) => void;
};

export type GameInitializedPayload = {
    board: string;
    legalMoves: number[];
    broadcast?: (action: string) => void;
    goOpponent?: string;
};

export type JoinRoomPayload = {
    room: string;
    uuid: string;
};

export type LeaveRoomPayload = {
    broadcast?: (action: string) => void;
};

export type ShuffleBoardPayload = {
    broadcast?: (action: string) => void;
    board: string;
    lastMove: number;
};
