import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { chessSelector } from '../../../redux/Chess';
import { userSelector } from '../../../redux/User';
import { getCurrentTurn } from '../../../engine/board';

interface InGameTextProps {
  classes: any;
}

export const InGameText: FC<InGameTextProps> = ({ classes }) => {
  const { isCheck, legalMoves, board } = useSelector(chessSelector);
  const { color } = useSelector(userSelector);
  const isAITurn = getCurrentTurn(board) !== color;
  const isCheckMate = isCheck && legalMoves.length === 0;

  const topText = isCheckMate ? (
    <span className={'top'}>Checkmate!</span>
  ) : isAITurn ? (
    <span className={'top'}>Thinking...</span>
  ) : isCheck ? (
    <span className={'top'}>Check!</span>
  ) : null;

  const bottomText = isAITurn ? (
    <span className={'bottom'}>Their Turn</span>
  ) : (
    <span className={'bottom'}>Your Turn</span>
  );

  return (
    <div className={classes.inGameText}>
      {topText}
      {bottomText}
    </div>
  );
};

export default InGameText;
