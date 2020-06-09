import React, { FC, useEffect, useCallback } from 'react';
import { useStyles } from './style';
import { goSelector } from '../../redux/Go';
import { handlePlayerMove, startGame } from '../../redux/Go/actions';
import { useSelector, useDispatch } from 'react-redux';
import Square from './components/Square';
import { getNumSquares } from '../../goEngine/board';

export interface GoProps {
    
}

export const Go: FC<GoProps> = () => {
    const dispatch = useDispatch();
    const { board, legalMoves, lastMove, zones } = useSelector(goSelector);

    const handleClickSquare = useCallback((pos: number) => {
        dispatch(handlePlayerMove(pos));
    }, [dispatch]);

    useEffect(() => {
        dispatch(startGame());
    }, []);

    const numSquares = getNumSquares(board);
    const numSquaresPerSide = Math.sqrt(numSquares);
    const classes = useStyles({ numSquaresPerSide });

    return (
        <div className={classes.root}>
            {board.slice(0, numSquares).split('')
                .map((square, idx) => {
                    return (
                        <Square
                            key={`${idx}-square`}
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
