import React, { FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { chessSelector } from '../../../redux/Chess';
import Piece from '../../../gfx/piece';
import 'css.gg/icons/unavailable.css';

export interface LastCapturedPieceProps {
  classes: any;
}

export const LastCapturedPiece: FC<LastCapturedPieceProps> = ({ classes }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { lastCapturedPiece } = useSelector(chessSelector);

  useEffect(() => {
    if (lastCapturedPiece?.[1] && lastCapturedPiece?.[1] !== '-') {
      const ctx = canvasRef.current.getContext('2d');
      const piece = new Piece(
        lastCapturedPiece[1],
        0,
        ctx,
        null,
        60,
        20,
        20,
        0,
      );

      piece.draw(false, null, null);

      return () => {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      };
    }
  }, [lastCapturedPiece?.[1] ?? null]);

  return (
    <div className={classes.lastCapturedPiece}>
      <i className={'gg-unavailable'}/>
      <canvas ref={canvasRef} height={'100px'} width={'100px'}/>
    </div>
  );
};

export default LastCapturedPiece;
