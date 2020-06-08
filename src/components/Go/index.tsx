import React, { FC } from 'react';
import { useStyles } from './style';
import { goSelector } from '../../redux/Go';
import { useSelector, useDispatch } from 'react-redux';
import Square from './components/Square';

export interface GoProps {
    
}

export const Go: FC<GoProps> = () => {
    const classes = useStyles({});
    const dispatch = useDispatch();
    const { board, legalMoves } = useSelector(goSelector);

    const handleClickSquare = (pos: number) => {
        console.log(pos);
    };

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
                            disabled={false}
                            canMoveTo={legalMoves.includes(idx)}
                        />
                    );
                })
            }
        </div>
    );
};

export default Go;
