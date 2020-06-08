export interface GoState {
    board: string;
    legalMoves: number[];
    lastRejectedMove: number;
    turnsElapsed: number;
}
