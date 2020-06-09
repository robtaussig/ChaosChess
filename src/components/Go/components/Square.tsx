import React, { FC, memo } from 'react';
import { useSquareStyles } from '../style';
import classNames from 'classnames';

export interface SquareProps {
    square: string;
    pos: number;
    onClick: (pos: number) => void;
    disabled: boolean;
    wasLastMove: boolean;
    zone: string;
}

export const Square: FC<SquareProps> = ({
    square,
    pos,
    onClick,
    disabled,
    wasLastMove,
    zone,
}) => {
    const classes = useSquareStyles({});
    
    return (
        <button
            className={classNames(classes.root, {
                whitePiece: square === 'w',
                blackPiece: square === 'b',
                left: pos % 9 === 0,
                top: pos < 9,
                bottom: pos > 71,
                right: (pos + 1) % 9 === 0,
                wasLastMove,
                whiteZone: zone === 'w',
                blackZone: zone === 'b',
            }, `col-${pos % 9}`, `row-${Math.floor(pos / 9)}`)}
            onClick={() => onClick(pos)}
            disabled={disabled || square !== '-'}
        />
    );
};

export default memo(Square);
