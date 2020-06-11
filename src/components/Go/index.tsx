import React, { FC, useEffect, useCallback } from 'react';
import { useStyles } from './style';
import { goSelector } from '../../redux/Go';
import { handlePlayerMove, startGame, makeAIMove } from '../../redux/Go/actions';
import { useSelector, useDispatch } from 'react-redux';
import Square from './components/Square';
import { getNumSquares } from '../../goEngine/board';
import { Color } from '../../goEngine/types';
import { SpecialValues } from '../../goEngine/constants';
import { useSocket } from '../../hooks/useSocket';

export interface GoProps {
    
}

export const Go: FC<GoProps> = () => {
    const dispatch = useDispatch();
    const broadcast = useSocket();
    const { board, legalMoves, lastMove, zones, userColor, goRoom } = useSelector(goSelector);

    const numSquares = getNumSquares(board);
    const numSquaresPerSide = Math.sqrt(numSquares);
    const classes = useStyles({ numSquaresPerSide });
    const lastMoved = board[getNumSquares(board) + SpecialValues.CurrentTurn];
    const canMove = userColor === Color.None || userColor !== lastMoved;

    const handleClickSquare = useCallback((pos: number) => {
        dispatch(handlePlayerMove(broadcast, pos));
    }, [dispatch]);

    useEffect(() => {
        dispatch(startGame(broadcast));
    }, []);

    useEffect(() => {
        if (!goRoom && !canMove) {
            dispatch(makeAIMove());
        }
    }, [dispatch, canMove, goRoom]);

    return (
        <div className={classes.root}>
            {board.slice(0, numSquares).split('')
                .map((square, idx) => {
                    return (
                        <Square
                            key={`${idx}-${numSquaresPerSide}-square`}
                            square={square}
                            pos={idx}
                            onClick={handleClickSquare}
                            disabled={!canMove || !legalMoves.includes(idx)}
                            wasLastMove={lastMove === idx}
                            zone={zones[idx]}
                            numSquaresPerSide={numSquaresPerSide}
                        />
                    );
                })
            }
        </div>
    );
};

export default Go;
