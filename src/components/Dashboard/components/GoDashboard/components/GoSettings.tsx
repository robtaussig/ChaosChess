import React, { FC, useState, useEffect } from 'react';
import 'css.gg/icons/chevron-left.css';
import 'css.gg/icons/enter.css';
import 'css.gg/icons/check.css';
import 'css.gg/icons/arrow-left-r.css';
import { useSelector, useDispatch } from 'react-redux';
import { useGoSettingsStyle } from '../../style';
import DashboardButton from '../../DashboardButton';
import classNames from 'classnames';
import { goSelector } from '../../../../../redux/Go';
import { boardSizeChanged, joinGoRoom, leaveGoRoom, submitGoId, claimColor } from '../../../../../redux/Go/actions';
import { getNumSquares } from '../../../../../goEngine/board';
import { Color } from '../../../../../goEngine/types';
import { useSocket } from '../../../../../hooks/useSocket';
import { useHistory, useRouteMatch } from 'react-router-dom';

export interface GoSettingsProps {
    className: string;
    onClose: () => void;
}

export const GoSettings: FC<GoSettingsProps> = ({
    className,
    onClose,
}) => {
    const classes = useGoSettingsStyle({});
    const dispatch = useDispatch();
    const history = useHistory();
    const roomMatch: { params: { roomId: string } } = useRouteMatch('/go/:roomId');
    const broadcast = useSocket();
    const [inputtedRoomId, setInputtedRoomId] = useState('');
    const [inputtedGoId, setInputtedGoId] = useState('');
    const { board, initialBoard, goRoom, goId, userColor } = useSelector(goSelector);
    const numSquares = getNumSquares(board ?? initialBoard);
    const squaresPerSize = Math.sqrt(numSquares);

    const handleClickJoin = () => {
        history.push(`/go/${inputtedRoomId.toLowerCase()}`);
        setInputtedRoomId('');
    };

    const handleSubmitGoId = () => {
        dispatch(submitGoId(broadcast, inputtedGoId));
        setInputtedGoId('');
    };

    const handleClaimColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
        switch (e.target.value) {
            case 'Black':
                dispatch(claimColor(broadcast, Color.Black));
                break;
            case 'White':
                dispatch(claimColor(broadcast, Color.White));
                break;
            case 'Both':
                dispatch(claimColor(broadcast, Color.None));
                break;
            default:
                throw new Error('Unknowwn selection');
        }
    }

    useEffect(() => {
        if (roomMatch?.params?.roomId) {
            dispatch(joinGoRoom(broadcast, roomMatch?.params?.roomId));
        }
    }, [dispatch, broadcast, roomMatch?.params?.roomId]);
    
    return (
        <div className={classNames(classes.root, className)}>
            <h2 className={classes.header}>Go Settings</h2>
            {goRoom ?
                goId ? (
                    <span className={classes.joinedText}>
                        Joined {goRoom} as {goId}
                    </span>
                ) : (
                <label className={classes.roomInput}>
                    Enter name
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            handleSubmitGoId();
                        }}
                    >
                        <input
                            type={'text'}
                            value={inputtedGoId}
                            onChange={e => setInputtedGoId(e.target.value)}
                            onBlur={e => document.body.scrollTop = 0}
                        />
                    </form>
                </label>
            ) : (
                <label className={classes.roomInput}>
                    Multiplayer room
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            handleClickJoin();
                        }}
                    >
                        <input
                            type={'text'}
                            value={inputtedRoomId}
                            onChange={e => setInputtedRoomId(e.target.value)}
                            onBlur={e => document.body.scrollTop = 0}
                        />
                    </form>
                </label>
            )}
            {goRoom ?
                goId ? (
                    <DashboardButton
                        classes={classes}
                        className={'join'}
                        label={'Leave Room'}
                        icon={'arrow-left-r'}
                        onClick={() => dispatch(leaveGoRoom(broadcast))}
                    />
                ) : (
                    <DashboardButton
                        classes={classes}
                        className={'join'}
                        label={'Submit Name'}
                        icon={'check'}
                        onClick={handleSubmitGoId}
                    />
                ) : (
                <DashboardButton
                    classes={classes}
                    className={'join'}
                    label={'Join'}
                    icon={'enter'}
                    disabled={inputtedRoomId === ''}
                    onClick={handleClickJoin}
                />
            )}
            <label className={classNames(classes.userColor)}>
                Claim color
                <select
                    value={
                        userColor === Color.None ?
                            'Both' :
                            userColor === Color.White ?
                                'White' :
                                'Black'
                }
                    onChange={handleClaimColor}
                    disabled={Boolean(userColor !== Color.None && goRoom)}
                >
                    <option>Black</option>
                    <option>White</option>
                    <option>Both</option>
                </select>
            </label>
            <label className={classNames(classes.boardSize)}>
                Board size
                <select
                    value={`${squaresPerSize}x${squaresPerSize}`}
                    onChange={e => dispatch(boardSizeChanged(broadcast, e.target.value as any))}
                >
                    <option>9x9</option>
                    <option>13x13</option>
                    <option>19x19</option>
                </select>
            </label>
            <DashboardButton
                classes={classes}
                className={'back'}
                label={'Back'}
                icon={'chevron-left'}
                onClick={onClose}
            />
        </div>
    );
};

export default GoSettings;
