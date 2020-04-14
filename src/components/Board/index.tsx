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
import { processMove, startGame, makeMoveAndUpdateOpponent } from '../../redux/Engine/actions';
import { opponentSelector, OpponentType } from '../../redux/Opponent';
import { userSelector } from '../../redux/User';
import { useSocket } from '../../hooks/useSocket';
import { connectionSelector, HostPhase } from '../../redux/Connection';
import { getCurrentTurn } from '../../engine/board';
import { Color, WhitePieces, BlackPieces } from '../../engine/types';
import { getInitialBoardFromHost } from '../../messaging';

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
  const sendMessage = useSocket();
  const { stage, type: gameType, subType } = useSelector(gameSelector);
  const { type: opponentType, uuid } = useSelector(opponentSelector);
  const { hostPhase } = useSelector(connectionSelector);
  const { color } = useSelector(userSelector);

  const isHost =
    opponentType === OpponentType.AI ||
    hostPhase === HostPhase.Joined;

  const handleMove = useCallback((from: number, to: number) => {
    if (opponentType === OpponentType.AI) {
      dispatch(processMove(from, to, game.current));
    } else {
      dispatch(makeMoveAndUpdateOpponent(from, to, game.current, sendMessage));
    }
  }, [dispatch, sendMessage, opponentType]);

  useEffect(() => {
    if (stage === GameStages.Started) {
      if (game.current) game.current.deinit();
      game.current = getGameGenerator(gameType, subType, dispatch, sendMessage);
      game.current.init();
      if (isHost) {
        dispatch(startGame(game.current));
      } else {
        const startGameAsGuest = async () => {
          const { message } = await getInitialBoardFromHost(sendMessage, uuid);
          dispatch(startGame(game.current, message));
        };

        startGameAsGuest();
      }
    }
  }, [stage, gameType, subType, dispatch, isHost, uuid]);

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

  useEffect(() => {

    return () => game.current && game.current.deinit();
  }, []);

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
        flipped={color === Color.Black}
      />
      {game.current && game.current.render(board, color, isHost)}
    </main>
  );
};

export default Board;
