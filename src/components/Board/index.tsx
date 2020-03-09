import React, { FC, useRef, useCallback, useState } from 'react';
import useStyles from './styles';
import {CanvasChess} from './CanvasChess';
import { DEFAULT_BOARD, BOARD_MARGIN } from './constants';

export const Board: FC = () => {
  const classes = useStyles({});
  const rootRef = useRef(null);
  const [board, setBoard] = useState<string>(DEFAULT_BOARD);
  const [legalMoves, setLegalMoves] = useState<string[]>([]);
  const [validPiecesToMove, setValidPiecesToMove] = useState<string[]>([]);

  const handleMove = useCallback((from: string, to: string) => {

  }, []);

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
