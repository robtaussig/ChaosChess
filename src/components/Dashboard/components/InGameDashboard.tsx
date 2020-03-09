import React, { FC } from 'react';
import { useInGameDashboard } from './style';
import { useSelector } from 'react-redux';
import { chessSelector, CONSTANTS } from '../../../redux/Chess';
import { userSelector } from '../../../redux/User';

export const InGameDashboard: FC = () => {
  const classes = useInGameDashboard({});
  const { isCheck, legalMoves, board } = useSelector(chessSelector);
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
      {!isAITurn && (
        <span className={classes.inGameDashboardText}>Your turn</span>
      )}
    </div>
  );
};

export default InGameDashboard;
