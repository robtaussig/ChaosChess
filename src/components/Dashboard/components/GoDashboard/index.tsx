import React, { FC, useState } from 'react';
import { useGoStyles } from '../style';
import { useSelector, useDispatch } from 'react-redux';
import 'css.gg/icons/redo.css';
import 'css.gg/icons/ruler.css';
import 'css.gg/icons/home.css';
import 'css.gg/icons/eye.css';
import 'css.gg/icons/chevron-right.css';
import DashboardButton from '../DashboardButton';
import GoSettings from './components/GoSettings';
import { returnHome } from '../../../../redux/App';
import { goSelector } from '../../../../redux/Go';
import { startGame, passTurn, undo } from '../../../../redux/Go/actions';
import { Color, Piece } from '../../../../goEngine/types';
import { SpecialValues } from '../../../../goEngine/constants';
import { getRemovedPiecesCount, getNumSquares } from '../../../../goEngine/board';
import classNames from 'classnames';
import { useSocket } from '../../../../hooks/useSocket';
import 'css.gg/icons/shape-circle.css';

export const GoDashboard: FC = () => {
    const classes = useGoStyles({});
    const dispatch = useDispatch();
    const { board, turnsElapsed, winner, lastMove, points, userColor } = useSelector(goSelector);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const broadcast = useSocket();
    const blackCapturedPieces = getRemovedPiecesCount(board, Piece.Black);
    const whiteCapturedPieces = getRemovedPiecesCount(board, Piece.White);
    const lastMoved = board[getNumSquares(board) + SpecialValues.CurrentTurn];
    const canMove = userColor === Color.None || userColor !== lastMoved;

    return (
        <>
            <GoSettings
                className={classNames(classes.rotatable, {
                    hidden: !settingsOpen,
                })}
                onClose={() => setSettingsOpen(false)}
            />
            <div className={classNames(classes.root, classes.rotatable, {
                hidden: settingsOpen,
            })}>
                <i className={classNames('gg-shape-circle', classes.connectedIcon, {
                    connected: true,
                    connecting: false,
                    closed: false,
                })}/>
                <div className={classNames(classes.colorSpace, 'black', {
                    currentTurn: !winner && lastMoved === Color.White,
                    winner: winner === Color.Black || winner === Color.None,
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
                    winner: winner === Color.White || winner === Color.None,
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
                    onClick={() => dispatch(undo(broadcast))}
                />
                <DashboardButton
                    classes={classes}
                    className={'pass-turn'}
                    label={turnsElapsed > 0 && lastMove === null ? 'Call game' : 'Pass'}
                    icon={'chevron-right'}
                    disabled={Boolean(!canMove || turnsElapsed === 0 || winner)}
                    onClick={() => dispatch(passTurn(broadcast))}
                />
                <DashboardButton
                    classes={classes}
                    className={'settings'}
                    label={'Settings'}
                    icon={'ruler'}
                    onClick={() => setSettingsOpen(prev => !prev)}
                />
                {turnsElapsed === 0 ? (
                    <DashboardButton
                        classes={classes}
                        className={'main-menu'}
                        label={'Home'}
                        icon={'home'}
                        onClick={() => dispatch(returnHome())}
                    />
                ) : (
                    <DashboardButton
                        classes={classes}
                        className={'resign'}
                        label={winner ? 'New game': 'Resign'}
                        icon={'chevron-right'}
                        onClick={() => dispatch(startGame(broadcast))}
                    />
                )}
            </div>
        </>
    );
};

export default GoDashboard;
