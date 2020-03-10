import React, { FC, useRef, useCallback, useState, useEffect } from 'react';
import useStyles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import CanvasChess from './components/CanvasChess';
import { BOARD_MARGIN } from './constants';
import {
  gameSelector,
  GameStages,
  GameTypes,
} from '../../redux/Game';
import {
  DEFAULT_BOARD,
  gameInitialized,
  chessSelector,
  moveAttempted,
  moveReceived,
  legalMovesReceived,
} from '../../redux/Chess';
import { userSelector } from '../../redux/User';
import {
  getChaoticBoard,
} from './util';
import { WorkerInterface } from '../../engine/types';
import { getCurrentTurn } from '../../engine/board';
import { wrap } from 'comlink';

export const engineWorker = wrap<WorkerInterface>(
  new Worker('../../engine/engine.worker.ts')
);

export const Board: FC = () => {
  const classes = useStyles({});
  const dispatch = useDispatch();
  const rootRef = useRef(null);
  const {
    board,
    legalMoves,
    validPiecesToMove,
    isCheck,
    lastRejectedMove,
  } = useSelector(chessSelector);
  const { color: userColor } = useSelector(userSelector);
  const { stage, type } = useSelector(gameSelector);

  const handleMove = useCallback((from: number, to: number) => {
    dispatch(moveAttempted({ from, to }));
  }, [dispatch]);

  useEffect(() => {
    const getBoardState = async () => {
      const startingBoard = type === GameTypes.Regular ?
        DEFAULT_BOARD :
        await getChaoticBoard();
      
      dispatch(gameInitialized(startingBoard));
    };
  
    if (stage === GameStages.Started) {
      getBoardState();
    }
  }, [stage, type, dispatch]);

  useEffect(() => {
    const getBestMove = async () => {
      const validMovesResponse = await engineWorker.getValidMoves(board);
      const bestMoveResponse = await engineWorker.getBestMove(board);

      dispatch(moveReceived({
        isCheck: validMovesResponse.isCheck,
        legalMoves: validMovesResponse.legalMoves,
        bestMove: bestMoveResponse[1],
      }))
    };

    const getAvailableMoves = async () => {
      const validMovesResponse = await engineWorker.getValidMoves(board);

      dispatch(legalMovesReceived({
        isCheck: validMovesResponse.isCheck,
        legalMoves: validMovesResponse.legalMoves,
      }));
    };
  
    if (stage === GameStages.InProgress) {
      if (getCurrentTurn(board) !== userColor) {
        getBestMove();
      } else {
        getAvailableMoves();
      }
    }
  }, [stage, board, userColor, dispatch]);

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
