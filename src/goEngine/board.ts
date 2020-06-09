import { SpecialValues } from './constants';
import { CapturedZones } from '../redux/Go/types';
import { Piece, Color } from './types';

interface Visited {
    [pos: number]: boolean;
};

const getAdjacentSquares = (board: string) => {
    const numSquares = getNumSquares(board);
    const numSquaresPerSide = Math.sqrt(numSquares);

    return [
        {
            dir: 1,
            condition: (pos: number) => (pos + 1) % numSquaresPerSide !== 0,
        },
        {
            dir: -1,
            condition: (pos: number) => pos % numSquaresPerSide !== 0,
        },
        {
            dir: numSquaresPerSide * -1,
            condition: (pos: number) => pos >= numSquaresPerSide,
        },
        {
            dir: numSquaresPerSide,
            condition: (pos: number) => pos <= numSquares - numSquaresPerSide,
        },
    ];
};

const getChainIfNoLiberties = (board: string, pos: number, visited: Visited = {}) => {
    let hasLiberty = false;
    let queue: number[] = [pos];
    const piece = board[pos];
    const chain: number[] = [];
    const adjacentSquares = getAdjacentSquares(board);

    while (queue.length > 0) {
        const currentNode = queue.shift();
        chain.push(currentNode);
        visited[currentNode] = true;
        const toVisit = adjacentSquares
            .reduce((next, { dir, condition }) => {
                if (condition(currentNode)) {
                    const nextNode = currentNode + dir;
                    if (!visited[nextNode]) {
                        if (board[nextNode] === piece) {
                            next.push(nextNode);
                        } else if (board[nextNode] === Piece.Empty) {
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

export const getRemovedPiecesCount = (board: string, piece: string): number => {
    const numSquares = getNumSquares(board);

    const tensPos = piece === Piece.White ?
        numSquares + SpecialValues.WhiteCapturedPiecesTens :
        numSquares + SpecialValues.BlackCapturedPiecesTens;
    const onesPos = piece === Piece.White ?
        numSquares + SpecialValues.WhiteCapturedPiecesOnes :
        numSquares + SpecialValues.BlackCapturedPiecesOnes;

    return Number(`${board[tensPos]}${board[onesPos]}`);
};

const updateCaptureCount = (board: string, piece: string, count: number): string => {
    const stringified = String(count);
    const numSquares = getNumSquares(board);

    const tensPos = piece === Piece.White ?
        numSquares + SpecialValues.WhiteCapturedPiecesTens :
        numSquares + SpecialValues.BlackCapturedPiecesTens;
    const onesPos = piece === Piece.White ?
        numSquares + SpecialValues.WhiteCapturedPiecesOnes :
        numSquares + SpecialValues.BlackCapturedPiecesOnes;

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
    const numSquares = getNumSquares(board);

    while (pointer < numSquares) {
        if (!visited[pointer] && board[pointer] !== Piece.Empty && colorToExclude !== board[pointer]) {
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
        board = updateBoard(board, pos, Piece.Empty);
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
    const currentTurnBit = getCurrentTurnBit(board);
    const currentPieceType = board[currentTurnBit] === Color.Black ? Piece.White : Piece.Black;

    const afterMove = pos ? updateBoard(board, pos, currentPieceType) : board;
    const afterToggleTurn = updateBoard(afterMove, currentTurnBit, currentPieceType === Piece.White ? Color.White : Color.Black);
    const afterCaptures = handleCaptures(afterToggleTurn, currentPieceType);

    return afterCaptures;
};

const hasAtLeastOneLiberty = (
    board: string,
    pos: number,
    sharedLiberties: Piece = Piece.Empty,
    visited: { [pos: number]: boolean } = { [pos]: true },
): boolean => {
    return getAdjacentSquares(board)
        .some(({ dir, condition }) => {
            if (condition(pos)) {
                const nextNode = pos + dir;
                if (!visited[nextNode]) {
                    if (board[nextNode] === Piece.Empty) {
                        return true;
                    } else if (board[nextNode] === sharedLiberties) {
                        return hasAtLeastOneLiberty(board, nextNode, sharedLiberties, visited);
                    }
                }
            }
            return false;
        });
}

export const getCurrentTurnBit = (board: string): number => {
    const numSquares = getNumSquares(board);
    return numSquares + SpecialValues.CurrentTurn;
};

export const findLegalMoves = (board: string, history: string[]): number[] => {
    let pointer: number = 0;
    const legalMoves: number[] = [];
    const currentTurnBit = getCurrentTurnBit(board);
    const currentPieceType = board[currentTurnBit] === Color.Black ? Piece.White : Piece.Black;

    while (pointer < currentTurnBit) {
        if (board[pointer] === Piece.Empty) {
            let hasLiberty = hasAtLeastOneLiberty(board, pointer, currentPieceType);
            if (!hasLiberty) {
                const afterMove = updateBoard(board, pointer, currentPieceType);
                const afterCaptures = handleCaptures(afterMove, currentPieceType);
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
            return !history.includes(afterMove.slice(0, currentTurnBit));
        });
};

const getChainIfNoContestingStones = (
    board: string,
    pos: number,
    color: string,
    visited: Visited = {},
) => {
    let foundOpposingColor = false;
    const opposingColor = color === Piece.White ? Piece.Black : Piece.White;
    let queue: number[] = [pos];
    visited[pos] = true;
    const piece = board[pos];
    const chain: number[] = [];
    const adjacentSquares = getAdjacentSquares(board);

    while (queue.length > 0) {
        const currentNode = queue.shift();
        chain.push(currentNode);
        const toVisit = 
            adjacentSquares.reduce((next, { dir, condition }) => {
                if (condition(currentNode)) {
                    const nextNode = currentNode + dir;
                    if (!visited[nextNode]) {
                        if (board[nextNode] === piece) {
                            visited[nextNode] = true;
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

export const getNumSquares = (board: string): number => {
    return board.search(/[WB]/);
}

const getZones = (board: string, color: string): number[] => {
    let visited: Visited = {};
    let zones: number[] = [];
    let pointer: number = 0;
    const numSquares = getNumSquares(board);

    while (pointer < numSquares) {
        if (!visited[pointer] && board[pointer] === Piece.Empty) {
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
    const whiteZones = getZones(board, Piece.White);
    const blackZones = getZones(board, Piece.Black);
    const whiteStones = board.split('').filter(piece => piece === Piece.White).length;
    const blackStones = board.split('').filter(piece => piece === Piece.Black).length;
    const whitePoints = whiteZones.length + whiteStones;
    const blackPoints = blackZones.length + blackStones;

    const zones: CapturedZones = {};
    whiteZones.forEach(zone => {
        zones[zone] = Piece.White;
    });
    blackZones.forEach(zone => {
        zones[zone] = Piece.Black;
    });
    
    return {
        whitePoints,
        blackPoints,
        zones,
    };
};
