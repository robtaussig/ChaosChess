export interface WorkerInterface {
    getValidMoves: (board: string, history?: string[]) => number[];
    getBestMove: (board: string, depth?: number) => [number, number];
}

export enum Color {
    White = 'w',
    Black = 'b',
}
