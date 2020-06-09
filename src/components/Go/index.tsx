import React, { FC, useEffect } from 'react';
import { useStyles } from './style';
import { goSelector } from '../../redux/Go';
import { handlePlayerMove, startGame } from '../../redux/Go/actions';
import { useSelector, useDispatch } from 'react-redux';
import Square from './components/Square';

export interface GoProps {
    
}

export const Go: FC<GoProps> = () => {
    const classes = useStyles({});
    const dispatch = useDispatch();
    const { board, legalMoves, lastMove, zones } = useSelector(goSelector);

    const handleClickSquare = (pos: number) => {
        dispatch(handlePlayerMove(pos));
    };

    useEffect(() => {
        dispatch(startGame());
    }, []);

    return (
        <div className={classes.root}>
            {board.slice(0, 81).split('')
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
                        />
                    );
                })
            }
        </div>
    );
};

export default Go;
