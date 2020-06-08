import React, { FC } from 'react';
import { useGoStyles } from '../style';
import { useSelector, useDispatch } from 'react-redux';
import 'css.gg/icons/redo.css';
import 'css.gg/icons/home.css';
import DashboardButton from '../DashboardButton';
import { returnHome } from '../../../../redux/App';
import { goSelector } from '../../../../redux/Go';
import { startGame } from '../../../../redux/Go/actions';
import { Color } from '../../../../goEngine/types';
import { SpecialValues } from '../../../../goEngine/constants';
import classNames from 'classnames';

export const GoDashboard: FC = () => {
    const classes = useGoStyles({});
    const dispatch = useDispatch();
    const { board } = useSelector(goSelector);

    const blackCapturedPieces = Number(`${board[SpecialValues.BlackCapturedPiecesTens]}${board[SpecialValues.BlackCapturedPiecesOnes]}`);
    const whiteCapturedPieces = Number(`${board[SpecialValues.WhiteCapturedPiecesTens]}${board[SpecialValues.WhiteCapturedPiecesOnes]}`);

    const handleClickStartOver = () => {
        dispatch(startGame());
    };

    return (
        <div className={classes.root}>
            <div className={classNames(classes.capturedPieces, 'black')}>
                <span className={classes.capturedHeader}>Black captured:</span>
                <span className={classes.capturedValue}> {blackCapturedPieces}</span>
            </div>
            <div className={classNames(classes.capturedPieces, 'white')}>
                <span className={classes.capturedHeader}>White captured:</span>
                <span className={classes.capturedValue}> {whiteCapturedPieces}</span>
            </div>
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
                onClick={handleClickStartOver}
            />
        </div>
    );
};

export default GoDashboard;
