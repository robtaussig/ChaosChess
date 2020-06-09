import { SpecialValues } from './constants';
import { CapturedZones } from '../redux/Go/types';

interface Visited {
    [pos: number]: boolean;
};

const ADJACENT_SQUARES = [
    {
        dir: 1,
        condition: (pos: number) => (pos + 1) % 9 !== 0,
    },
    {
        dir: -1,
        condition: (pos: number) => pos % 9 !== 0,
    },
    {
        dir: -9,
        condition: (pos: number) => pos > 8,
    },
    {
        dir: 9,
        condition: (pos: number) => pos < 73,
    },
];

const getChainIfNoLiberties = (board: string, pos: number, visited: Visited = {}) => {
    let hasLiberty = false;
    let queue: number[] = [pos];
    const piece = board[pos];
    const chain: number[] = [];

    while (queue.length > 0) {
        const currentNode = queue.shift();
        chain.push(currentNode);
        visited[currentNode] = true;
        const toVisit = ADJACENT_SQUARES
            .reduce((next, { dir, condition }) => {
                if (condition(currentNode)) {
                    const nextNode = currentNode + dir;
                    if (!visited[nextNode]) {
                        if (board[nextNode] === piece) {
                            next.push(nextNode);
                        } else if (board[nextNode] === '-') {
                            hasLiberty = true;
                        }
                    }
                }
                return next;
            }, [] as number[]);
        queue = queue.concat(toVisit);
    }

    if (!hasLiberty) return chain;
};

const getRemovedPiecesCount = (board: string, color: string): number => {
    if (color === 'w') {
        return Number(`${board[SpecialValues.WhiteCapturedPiecesTens]}${board[SpecialValues.WhiteCapturedPiecesOnes]}`);
    } else {
        return Number(`${board[SpecialValues.BlackCapturedPiecesTens]}${board[SpecialValues.BlackCapturedPiecesOnes]}`);
    }
};

const updateCaptureCount = (board: string, color: string, count: number): string => {
    const stringified = String(count);
    const tensPos = color === 'w' ?
        SpecialValues.WhiteCapturedPiecesTens :
        SpecialValues.BlackCapturedPiecesTens;
    const onesPos = color === 'w' ?
        SpecialValues.WhiteCapturedPiecesOnes :
        SpecialValues.BlackCapturedPiecesOnes;

    if (count > 9) {
        board = updateBoard(board, tensPos, stringified[0]);
        board = updateBoard(board, onesPos, stringified[1]);
    } else {
        board = updateBoard(board, tensPos, '0');
        board = updateBoard(board, onesPos, stringified);
    }
    return board;
};

const getCaptures = (board: string, colorToExclude: string): number[] => {
    let visited: Visited = {};
    let toRemove: number[] = [];
    let pointer: number = 0;

    while (pointer < SpecialValues.BlackTurn) {
        if (!visited[pointer] && board[pointer] !== '-' && colorToExclude !== board[pointer]) {
            const currentChain = getChainIfNoLiberties(board, pointer, visited);
            if (currentChain) {
                toRemove = toRemove.concat(currentChain);
            }
        }
        pointer++;
    }

    return toRemove;
}

const handleCaptures = (board: string, colorToExclude: string = null): string => {
    const toRemove = getCaptures(board, colorToExclude);

    toRemove.forEach(pos => {
        const pieceToRemove = board[pos];
        board = updateBoard(board, pos, '-');
        const currentRemoveCount = getRemovedPiecesCount(board, pieceToRemove);
        board = updateCaptureCount(board, pieceToRemove, currentRemoveCount + 1);
    });

    return board;
};

const updateBoard = (board: string, pos: number, value: string): string => {
    return board.substr(0, pos)
        + value
        + board.substr(pos + 1);
};

export const makeMove = (board: string, pos?: number): string => {
    const currentPiece = board[SpecialValues.BlackTurn] === '1' ? 'w' : 'b';

    const afterMove = pos ? updateBoard(board, pos, currentPiece) : board;
    const afterToggleTurn = updateBoard(afterMove, SpecialValues.BlackTurn, currentPiece === 'w' ? '0' : '1');
    const afterCaptures = handleCaptures(afterToggleTurn, currentPiece);

    return afterCaptures;
};

const hasAtLeastOneLiberty = (board: string, pos: number) => {
    return ADJACENT_SQUARES.some(({ dir, condition }) => {
        if (condition(pos)) {
            const nextNode = pos + dir;
            if (board[nextNode] === '-') {
                return true;
            }
        }
        return false;
    });
}

export const findLegalMoves = (board: string, history: string[]): number[] => {
    let pointer: number = 0;
    const legalMoves: number[] = [];
    const currentTurn = board[SpecialValues.BlackTurn] === '1' ? 'w' : 'b';

    while (pointer < SpecialValues.BlackTurn) {
        if (board[pointer] === '-') {
            let hasLiberty = hasAtLeastOneLiberty(board, pointer);
            if (!hasLiberty) {
                const afterMove = updateBoard(board, pointer, currentTurn);
                const afterCaptures = handleCaptures(afterMove, currentTurn);
                hasLiberty = hasAtLeastOneLiberty(afterCaptures, pointer);
            }

            if (hasLiberty) {
                legalMoves.push(pointer);
            }
        }
        pointer++;
    }

    return legalMoves
        .filter(move => {
            const afterMove = makeMove(board, move);
            return !history.includes(afterMove.slice(0, SpecialValues.BlackTurn));
        });
};

const getChainIfNoContestingStones = (
    board: string,
    pos: number,
    color: string,
    visited: Visited = {},
) => {
    let foundOpposingColor = false;
    const opposingColor = color === 'w' ? 'b' : 'w';
    let queue: number[] = [pos];
    const piece = board[pos];
    const chain: number[] = [];

    while (queue.length > 0) {
        const currentNode = queue.shift();
        chain.push(currentNode);
        visited[currentNode] = true;
        const toVisit = ADJACENT_SQUARES
            .reduce((next, { dir, condition }) => {
                if (condition(currentNode)) {
                    const nextNode = currentNode + dir;
                    if (!visited[nextNode]) {
                        if (board[nextNode] === piece) {
                            next.push(nextNode);
                        } else if (board[nextNode] === opposingColor) {
                            foundOpposingColor = true;
                        }
                    }
                }
                return next;
            }, [] as number[]);
        queue = queue.concat(toVisit);
    }

    if (!foundOpposingColor) return chain;
};

const getZones = (board: string, color: string): number[] => {
    let visited: Visited = {};
    let zones: number[] = [];
    let pointer: number = 0;

    while (pointer < SpecialValues.BlackTurn) {
        if (!visited[pointer] && board[pointer] === '-') {
            const currentChain = getChainIfNoContestingStones(board, pointer, color, visited);
            if (currentChain) {
                zones = zones.concat(currentChain);
            }
        }
        pointer++;
    }

    return [...new Set(zones)];
}

export const getWinner = (board: string): { whitePoints: number, blackPoints: number, zones: CapturedZones } => {
    const whiteZones = getZones(board, 'w');
    const blackZones = getZones(board, 'b');
    const whiteStones = board.split('').filter(piece => piece === 'w').length;
    const blackStones = board.split('').filter(piece => piece === 'b').length;
    const whitePoints = whiteZones.length + whiteStones;
    const blackPoints = blackZones.length + blackStones;

    const zones: CapturedZones = {};
    whiteZones.forEach(zone => {
        zones[zone] = 'w';
    });
    blackZones.forEach(zone => {
        zones[zone] = 'b';
    });
    
    return {
        whitePoints,
        blackPoints,
        zones,
    };
};
