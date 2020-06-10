import React, { FC, useState, useEffect } from 'react';
import 'css.gg/icons/chevron-left.css';
import 'css.gg/icons/enter.css';
import 'css.gg/icons/arrow-left-r.css';
import { useSelector, useDispatch } from 'react-redux';
import { useGoSettingsStyle } from '../../style';
import DashboardButton from '../../DashboardButton';
import classNames from 'classnames';
import { goSelector } from '../../../../../redux/Go';
import { boardSizeChanged, joinGoRoom, leaveGoRoom } from '../../../../../redux/Go/actions';
import { getNumSquares } from '../../../../../goEngine/board';
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
    const { board, initialBoard, goRoom } = useSelector(goSelector);
    const numSquares = getNumSquares(board ?? initialBoard);
    const squaresPerSize = Math.sqrt(numSquares);

    const handleClickJoin = () => {
        history.push(`/go/${inputtedRoomId}`);
        setInputtedRoomId('');
    };

    useEffect(() => {
        if (roomMatch?.params?.roomId) {
            dispatch(joinGoRoom(broadcast, roomMatch?.params?.roomId));
        }
    }, [dispatch, broadcast, roomMatch?.params?.roomId]);
    
    return (
        <div className={classNames(classes.root, className)}>
            <h2 className={classes.header}>Go Settings</h2>
            {goRoom ? (
                <span className={classes.joinedRoom}>
                    Joined {goRoom}
                </span>
            ) : (
                <label className={classes.roomInput}>
                    Multiplayer room
                    <input
                        type={'text'}
                        value={inputtedRoomId}
                        onChange={e => setInputtedRoomId(e.target.value)}
                        onBlur={e => document.body.scrollTop = 0}
                    />
                </label>
            )}
            {goRoom ? (
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
                    label={'Join'}
                    icon={'enter'}
                    disabled={inputtedRoomId === ''}
                    onClick={handleClickJoin}
                />
            )}
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
