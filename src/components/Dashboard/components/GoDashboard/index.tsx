import React, { FC } from 'react';
import { useGoStyles } from '../style';
import { useSelector, useDispatch } from 'react-redux';
import 'css.gg/icons/redo.css';
import 'css.gg/icons/home.css';
import 'css.gg/icons/chevron-right.css';
import DashboardButton from '../DashboardButton';
import { returnHome } from '../../../../redux/App';
import { goSelector } from '../../../../redux/Go';
import { startGame, passTurn, resignGame } from '../../../../redux/Go/actions';
import { Color } from '../../../../goEngine/types';
import { SpecialValues } from '../../../../goEngine/constants';
import classNames from 'classnames';

export const GoDashboard: FC = () => {
    const classes = useGoStyles({});
    const dispatch = useDispatch();
    const { board, turnsElapsed, winner, lastMove, points } = useSelector(goSelector);

    const blackCapturedPieces = Number(`${board[SpecialValues.BlackCapturedPiecesTens]}${board[SpecialValues.BlackCapturedPiecesOnes]}`);
    const whiteCapturedPieces = Number(`${board[SpecialValues.WhiteCapturedPiecesTens]}${board[SpecialValues.WhiteCapturedPiecesOnes]}`);

    return (
        <div className={classes.root}>
            <div className={classNames(classes.capturedPieces, 'black')}>
                <span className={classes.capturedHeader}>
                    {winner ? 'Black points:' : 'Black captured:'}
                </span>
                <span className={classes.capturedValue}>
                    {winner ? points.black : blackCapturedPieces}
                </span>
            </div>
            <div className={classNames(classes.capturedPieces, 'white')}>
                <span className={classes.capturedHeader}>
                    {winner ? 'White points:' : 'White captured:'}
                </span>
                <span className={classes.capturedValue}>
                    {winner ? points.white : whiteCapturedPieces}
                </span>
            </div>
            {winner ? (
                <div className={classes.results}>
                    {winner === 'w' ? 'White wins' : 'Black wins'}
                </div>
            ) : (
                <>
                    <DashboardButton
                        classes={classes}
                        className={'pass-turn'}
                        label={turnsElapsed > 0 && lastMove === null ? 'Call game' : 'Pass'}
                        icon={'chevron-right'}
                        disabled={turnsElapsed === 0}
                        onClick={() => dispatch(passTurn())}
                    />
                    <DashboardButton
                        classes={classes}
                        className={'resign'}
                        label={'Resign'}
                        icon={'chevron-right'}
                        onClick={() => dispatch(startGame())}
                    />
                </>
            )}
            <DashboardButton
                classes={classes}
                className={'main-menu'}
                label={'Home'}
                hideLabel={true}
                icon={'home'}
                onClick={() => dispatch(returnHome())}
            />
            <DashboardButton
                classes={classes}
                className={'start-over'}
                label={'Start over'}
                icon={'redo'}
                onClick={() => dispatch(startGame())}
            />
        </div>
    );
};

export default GoDashboard;
