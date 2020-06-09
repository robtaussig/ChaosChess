import React, { FC, memo } from 'react';
import { useSquareStyles } from '../style';
import classNames from 'classnames';
import { Piece } from '../../../goEngine/types';
import { isAnchorPoint } from '../util';

export interface SquareProps {
    square: string;
    pos: number;
    onClick: (pos: number) => void;
    disabled: boolean;
    wasLastMove: boolean;
    zone: string;
    numSquaresPerSide: number;
}

export const Square: FC<SquareProps> = ({
    square,
    pos,
    onClick,
    disabled,
    wasLastMove,
    zone,
    numSquaresPerSide,
}) => {
    const classes = useSquareStyles({ numSquaresPerSide });
    const column = pos % numSquaresPerSide;
    const row = Math.floor(pos / numSquaresPerSide);

    return (
        <button
            className={classNames(classes.root, {
                whitePiece: square === Piece.White,
                blackPiece: square === Piece.Black,
                left: pos % numSquaresPerSide === 0,
                top: pos < numSquaresPerSide,
                bottom: pos >= (Math.pow(numSquaresPerSide, 2) - numSquaresPerSide),
                right: (pos + 1) % numSquaresPerSide === 0,
                wasLastMove,
                whiteZone: zone === Piece.White,
                blackZone: zone === Piece.Black,
                anchorPoint: isAnchorPoint(numSquaresPerSide, row, column),
            }, `col-${column}`, `row-${row}`)}
            onClick={() => onClick(pos)}
            disabled={disabled || square !== Piece.Empty}
        />
    );
};

export default memo(Square);
