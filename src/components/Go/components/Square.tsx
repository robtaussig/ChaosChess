import React, { FC, memo } from 'react';
import { useSquareStyles } from '../style';
import classNames from 'classnames';

export interface SquareProps {
    square: string;
    pos: number;
    onClick: (pos: number) => void;
    disabled: boolean;
    canMoveTo: boolean;
}

export const Square: FC<SquareProps> = ({
    square,
    pos,
    onClick,
    disabled,
    canMoveTo,
}) => {
    const classes = useSquareStyles({});
    
    return (
        <button
            className={classNames(classes.root, {
                canMoveTo,
                whitePiece: square === 'w',
                blackPiece: square === 'b',
                left: pos % 9 === 0,
                top: pos < 9,
                bottom: pos > 71,
                right: (pos + 1) % 9 === 0,
            }, `col-${pos % 9}`, `row-${Math.floor(pos / 9)}`)}
            onClick={() => onClick(pos)}
            disabled={disabled || square !== '-'}
        />
    );
};

export default memo(Square);
