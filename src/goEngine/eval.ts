import {
    findLegalMoves,
  } from './board';

export const getBestMove = (
    board: string,
    lastMove: number,
    history: string[],
    depth: number,
): [number, number] => {
    //Auto pass if player passes
    if (history.length > 1 && lastMove === null) return [0, null];

    const legalMoves = findLegalMoves(board, history);

    const randomMove = legalMoves[Math.floor(Math.random() * legalMoves.length)];
    return [0, randomMove];
};
