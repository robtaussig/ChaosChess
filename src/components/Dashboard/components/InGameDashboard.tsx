import React, { FC } from 'react';
import { useInGameDashboard } from './style';
import { useSelector, useDispatch } from 'react-redux';
import { chessSelector, CONSTANTS } from '../../../redux/Chess';
import { userSelector } from '../../../redux/User';
import { gameStarted } from '../../../redux/Game';
import 'css.gg/icons/redo.css';
import DashboardButton from './DashboardButton';
import { opponentSelector } from '../../../redux/Opponent';
export const InGameDashboard: FC = () => {
  const classes = useInGameDashboard({});
  const dispatch = useDispatch();
  const { isCheck, legalMoves, board } = useSelector(chessSelector);
  const { type: opponentType } = useSelector(opponentSelector);
  const { color } = useSelector(userSelector);
  const isAITurn = board[CONSTANTS.CURRENT_TURN_BLACK_BIT] !== color;
  const isCheckMate = isCheck && legalMoves.length === 0;
  
  return (
    <div className={classes.root}>
      {isCheckMate && (
        <span className={classes.inGameDashboardText}>Checkmate!</span>
      )}
      {(isCheck && !isCheckMate) && (
        <span className={classes.inGameDashboardText}>Check</span>
      )}
      {(!isCheckMate && isAITurn) && (
        <span className={classes.inGameDashboardText}>Thinking...</span>
      )}
      {!isCheckMate && !isAITurn && (
        <span className={classes.inGameDashboardText}>Your turn</span>
      )}
      <DashboardButton
        classes={classes}
        className={'start-over'}
        label={'Start over'}
        icon={'redo'}
        onClick={() => dispatch(gameStarted({ opponent: opponentType }))}
      />
    </div>
  );
};

export default InGameDashboard;
