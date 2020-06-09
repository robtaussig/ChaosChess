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
}

export type MakeMovePayload = {
    board: string;
    legalMoves: number[];
    move: number;
}

export interface CapturedZones {
    [pos: number]: string;
}

export type GameOverPayload = {
    winner: string;
    zones: CapturedZones;
    points: { white: number, black: number };
};
