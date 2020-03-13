import React, { FC, useRef, useCallback, useEffect, useMemo } from 'react';
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
import { getCurrentTurn } from '../../engine/board';
import { Color, WhitePieces, BlackPieces } from '../../engine/types';

export const Board: FC = () => {
  const classes = useStyles({});
  const dispatch = useDispatch();
  const rootRef = useRef(null);
  const {
    board,
    legalMoves,
    validPiecesToMove,
    isCheck,
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

  const squaresToHighlight = useMemo(() => {
    const piecesToHighlight: number[] = [];
    if (isCheck) {
      const currentTurn = getCurrentTurn(board);
      if (currentTurn === Color.White) {
        piecesToHighlight.push(board.indexOf(WhitePieces.King));
      } else {
        piecesToHighlight.push(board.indexOf(BlackPieces.King));
      }
    }
    return piecesToHighlight;
  }, [isCheck, board])

  return (
    <main ref={rootRef} id={'board'} className={classes.root}>
      <CanvasChess
        onMove={handleMove}
        board={board}
        legalMoves={legalMoves}
        squaresToHighlight={squaresToHighlight}
        validPiecesToMove={validPiecesToMove}
        canvasWidth={`${window.innerWidth - (BOARD_MARGIN * 2)}px`}
        canvasHeight={`${window.innerWidth - (BOARD_MARGIN * 2)}px`}
      />
    </main>
  );
};

export default Board;
