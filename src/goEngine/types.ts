export interface WorkerInterface {
    getValidMoves: (board: string, history?: string[]) => number[];
    getBestMove: (board: string, lastMove: number, history?: string[], depth?: number) => [number, number];
}

export enum Piece {
    White = 'w',
    Black = 'b',
    Empty = '-',
}

export enum Color {
    White = 'W',
    Black = 'B',
    None = '.',
}
