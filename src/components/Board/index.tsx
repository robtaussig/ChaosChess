import React, { FC, useRef, useCallback, useEffect } from 'react';
import useStyles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import CanvasChess from './components/CanvasChess';
import { BOARD_MARGIN } from './constants';
import {
  gameSelector,
  GameStages,
} from '../../redux/Game';
import {
  chessSelector,
} from '../../redux/Chess';
import { getGameGenerator, BaseGame } from '../../games';
import { processMove, startGame } from '../../redux/Engine/actions';

export const Board: FC = () => {
  const classes = useStyles({});
  const dispatch = useDispatch();
  const rootRef = useRef(null);
  const {
    board,
    legalMoves,
    validPiecesToMove,
  } = useSelector(chessSelector);
  const game = useRef<BaseGame>(null);
  const { stage, type, subType } = useSelector(gameSelector);

  const handleMove = useCallback((from: number, to: number) => {
    dispatch(processMove(from, to, game.current));
  }, [dispatch]);

  useEffect(() => {
    if (stage === GameStages.Started) {
      game.current = getGameGenerator(type, subType);
      dispatch(startGame(game.current));
    }
  }, [stage, type, subType, dispatch]);

  return (
    <main ref={rootRef} id={'board'} className={classes.root}>
      <CanvasChess
        onMove={handleMove}
        board={board}
        legalMoves={legalMoves}
        validPiecesToMove={validPiecesToMove}
        canvasWidth={`${window.innerWidth - (BOARD_MARGIN * 2)}px`}
        canvasHeight={`${window.innerWidth - (BOARD_MARGIN * 2)}px`}
      />
    </main>
  );
};

export default Board;
