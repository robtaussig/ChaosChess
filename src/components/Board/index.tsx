import React, { FC, useCallback, useState, useRef } from 'react';
import useStyles from './styles';
import {CanvasChess} from './CanvasChess';
import { DEFAULT_BOARD } from './constants';

export const Board: FC = () => {
  const classes = useStyles({});
  const [board, setBoard] = useState<string>(DEFAULT_BOARD);
  const [legalMoves, setLegalMoves] = useState<string[]>(['75-55']);
  const [validPiecesToMove, setValidPiecesToMove] = useState<string[]>(['75']);

  const handleMove = useCallback((from: string, to: string) => {

  }, []);

  return (
    <main id={'board'} className={classes.root}>
      <CanvasChess
        onMove={handleMove}
        board={board}
        legalMoves={legalMoves}
        validPiecesToMove={validPiecesToMove}
        canvasWidth={`${window.innerWidth - 30}px`}
        canvasHeight={`${window.innerWidth - 30}px`}
      />
    </main>
  );
};

export default Board;
