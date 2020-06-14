import React, { FC, useState, useEffect } from 'react';
import { useGoStyles } from '../style';
import { useSelector, useDispatch } from 'react-redux';
import 'css.gg/icons/redo.css';
import 'css.gg/icons/ruler.css';
import 'css.gg/icons/home.css';
import 'css.gg/icons/hashtag.css';
import 'css.gg/icons/chevron-down.css';
import 'css.gg/icons/chevron-up.css';
import 'css.gg/icons/zoom-out.css';
import 'css.gg/icons/chevron-right.css';
import DashboardButton from '../DashboardButton';
import GoSettings from './components/GoSettings';
import { returnHome, appSelector, setBoardFocus } from '../../../../redux/App';
import { goSelector } from '../../../../redux/Go';
import { connectionSelector, ReadyState } from '../../../../redux/Connection';
import { startGame, passTurn, undo, claimColor, shuffleBoard } from '../../../../redux/Go/actions';
import { Color, Piece } from '../../../../goEngine/types';
import { SpecialValues } from '../../../../goEngine/constants';
import { getRemovedPiecesCount, getNumSquares } from '../../../../goEngine/board';
import classNames from 'classnames';
import { useSocket } from '../../../../hooks/useSocket';
import 'css.gg/icons/shape-circle.css';

export const GoDashboard: FC = () => {
    const classes = useGoStyles({});
    const dispatch = useDispatch();
    const { board, turnsElapsed, winner, lastMove, points, userColor, goId, goRoom, opponent } = useSelector(goSelector);
    const { status } = useSelector(connectionSelector);
    const { focusBoard } = useSelector(appSelector);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const broadcast = useSocket();
    const blackCapturedPieces = getRemovedPiecesCount(board, Piece.Black);
    const whiteCapturedPieces = getRemovedPiecesCount(board, Piece.White);
    const lastMoved = board[getNumSquares(board) + SpecialValues.CurrentTurn];
    const canMove = userColor === Color.None || userColor !== lastMoved;

    useEffect(() => {
        if (goRoom) {
            return () => {
                dispatch(claimColor(broadcast, Color.None));
            };
        }
    }, [broadcast, dispatch, goRoom]);

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
                    connected: status === ReadyState.OPEN,
                    connecting: status === ReadyState.CONNECTING,
                    closed: status === ReadyState.CLOSED,
                })}/>
                <button
                    className={classNames(classes.focusBoardButton, 'show-board-button', {
                        focused: focusBoard,
                    })}
                    onClick={() => dispatch(setBoardFocus(!focusBoard))}
                >
                    <i className={classNames({
                        'gg-chevron-up': focusBoard,
                        'gg-chevron-down': !focusBoard,
                    })}/>
                </button>
                <div className={classNames(classes.colorSpace, 'black', {
                    currentTurn: !winner && lastMoved === Color.White,
                    winner: winner === Color.Black || winner === Color.None,
                })}>
                    <span className={classNames(classes.playerName, {
                        isPlayer: userColor === Color.Black,
                        isOpponent: userColor === Color.White && opponent,
                        hasPlayer: userColor !== Color.None,
                    })}>
                        {userColor === Color.Black ? goId : opponent}
                    </span>
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
                    <span className={classNames(classes.playerName, {
                        isPlayer: userColor === Color.White,
                        isOpponent: userColor === Color.Black && opponent,
                        hasPlayer: userColor !== Color.None,
                    })}>
                        {userColor === Color.White ? goId : opponent}
                    </span>
                    <span className={classes.colorHeader}>
                        White:
                    </span>
                    <span className={classes.colorValue}>
                        {winner ? points.white : blackCapturedPieces}
                    </span>
                </div>
                {turnsElapsed > 0 ? (
                    <DashboardButton
                        classes={classes}
                        className={'undo'}
                        label={'Undo'}
                        icon={'redo'}
                        onClick={() => dispatch(undo(broadcast))}
                    />
                ) : (
                    <DashboardButton
                        classes={classes}
                        className={'shuffle'}
                        label={'Shuffle'}
                        icon={'hashtag'}
                        onClick={() => dispatch(shuffleBoard(broadcast))}
                    />
                )}
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
