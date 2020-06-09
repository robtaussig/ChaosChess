import React, { FC } from 'react';
import { useGoStyles } from '../style';
import { useSelector, useDispatch } from 'react-redux';
import 'css.gg/icons/redo.css';
import 'css.gg/icons/home.css';
import 'css.gg/icons/chevron-right.css';
import DashboardButton from '../DashboardButton';
import { returnHome } from '../../../../redux/App';
import { goSelector } from '../../../../redux/Go';
import { startGame, passTurn, resignGame, undo } from '../../../../redux/Go/actions';
import { Color, Piece } from '../../../../goEngine/types';
import { SpecialValues } from '../../../../goEngine/constants';
import { getRemovedPiecesCount, getNumSquares } from '../../../../goEngine/board';
import classNames from 'classnames';

export const GoDashboard: FC = () => {
    const classes = useGoStyles({});
    const dispatch = useDispatch();
    const { board, turnsElapsed, winner, lastMove, points } = useSelector(goSelector);

    const blackCapturedPieces = getRemovedPiecesCount(board, Piece.Black);
    const whiteCapturedPieces = getRemovedPiecesCount(board, Piece.White);
    const lastMoved = board[getNumSquares(board) + SpecialValues.CurrentTurn];

    return (
        <div className={classes.root}>
            <div className={classNames(classes.colorSpace, 'black', {
                currentTurn: !winner && lastMoved === Color.White,
                winner: winner === Color.Black,
            })}>
                <span className={classes.colorHeader}>
                    Black:
                </span>
                <span className={classes.colorValue}>
                    {winner ? points.black : whiteCapturedPieces}
                </span>
            </div>
            <div className={classNames(classes.colorSpace, 'white', {
                currentTurn: !winner && lastMoved === Color.Black,
                winner: winner === Color.White,
            })}>
                <span className={classes.colorHeader}>
                    White:
                </span>
                <span className={classes.colorValue}>
                    {winner ? points.white : blackCapturedPieces}
                </span>
            </div>
            <DashboardButton
                classes={classes}
                className={'undo'}
                label={'Undo'}
                icon={'redo'}
                disabled={Boolean(turnsElapsed === 0 || winner)}
                onClick={() => dispatch(undo())}
            />
            <DashboardButton
                classes={classes}
                className={'pass-turn'}
                label={turnsElapsed > 0 && lastMove === null ? 'Call game' : 'Pass'}
                icon={'chevron-right'}
                disabled={Boolean(turnsElapsed === 0 || winner)}
                onClick={() => dispatch(passTurn())}
            />
            <DashboardButton
                classes={classes}
                className={'resign'}
                label={winner ? 'Start over' : 'Resign'}
                icon={'chevron-right'}
                onClick={() => dispatch(startGame())}
            />
            <DashboardButton
                classes={classes}
                className={'main-menu'}
                label={'Home'}
                icon={'home'}
                onClick={() => dispatch(returnHome())}
            />
        </div>
    );
};

export default GoDashboard;
