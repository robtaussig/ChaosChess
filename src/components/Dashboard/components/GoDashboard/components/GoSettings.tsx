import React, { FC, useState } from 'react';
import 'css.gg/icons/chevron-left.css';
import 'css.gg/icons/enter.css';
import { useSelector, useDispatch } from 'react-redux';
import { useGoSettingsStyle } from '../../style';
import DashboardButton from '../../DashboardButton';
import classNames from 'classnames';
import { goSelector } from '../../../../../redux/Go';
import { boardSizeChanged, joinGoRoom } from '../../../../../redux/Go/actions';
import { getNumSquares } from '../../../../../goEngine/board';
import { useSocket } from '../../../../../hooks/useSocket';

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
    const broadcast = useSocket();
    const [inputtedRoomId, setInputtedRoomId] = useState('');
    const { board, initialBoard } = useSelector(goSelector);
    const numSquares = getNumSquares(board ?? initialBoard);
    const squaresPerSize = Math.sqrt(numSquares);

    const handleClickJoin = () => {
        dispatch(joinGoRoom(broadcast, inputtedRoomId));
        setInputtedRoomId('');
    };
    
    return (
        <div className={classNames(classes.root, className)}>
            <h2 className={classes.header}>Go Settings</h2>
            <label className={classes.roomInput}>
                Multiplayer room
                <input
                    type={'text'}
                    value={inputtedRoomId}
                    onChange={e => setInputtedRoomId(e.target.value)}
                />
            </label>
            <DashboardButton
                classes={classes}
                className={'join'}
                label={'Join'}
                icon={'enter'}
                disabled={inputtedRoomId === ''}
                onClick={handleClickJoin}
            />
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
