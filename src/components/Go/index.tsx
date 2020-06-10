import React, { FC, useEffect, useCallback } from 'react';
import { useStyles } from './style';
import { goSelector } from '../../redux/Go';
import { handlePlayerMove, startGame } from '../../redux/Go/actions';
import { useSelector, useDispatch } from 'react-redux';
import Square from './components/Square';
import { getNumSquares } from '../../goEngine/board';
import { useSocket } from '../../hooks/useSocket';

export interface GoProps {
    
}

export const Go: FC<GoProps> = () => {
    const dispatch = useDispatch();
    const broadcast = useSocket();
    const { board, legalMoves, lastMove, zones, expandedBoard } = useSelector(goSelector);

    const handleClickSquare = useCallback((pos: number) => {
        dispatch(handlePlayerMove(broadcast, pos));
    }, [dispatch]);

    useEffect(() => {
        dispatch(startGame(broadcast));
    }, []);

    const numSquares = getNumSquares(board);
    const numSquaresPerSide = Math.sqrt(numSquares);
    const classes = useStyles({ numSquaresPerSide, expandedBoard });

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
                            disabled={!legalMoves.includes(idx)}
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
