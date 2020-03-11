import React, { FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { chessSelector } from '../../../redux/Chess';
import Piece from '../../../gfx/piece';
import 'css.gg/icons/unavailable.css';
import classNames from 'classnames';

export interface LastCapturedPieceProps {
  classes: any;
}

export const LastCapturedPiece: FC<LastCapturedPieceProps> = ({ classes }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { lastCapturedPiece } = useSelector(chessSelector);

  const capturedPiece =
    lastCapturedPiece?.[1] && lastCapturedPiece[1] !== '-' ?
    lastCapturedPiece[1] :
    null;
  useEffect(() => {
    if (capturedPiece) {
      const ctx = canvasRef.current.getContext('2d');
      const piece = new Piece(
        capturedPiece,
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
  }, [capturedPiece]);

  return (
    <div className={classNames(classes.lastCapturedPiece, {
      capturedPiece, 
    })}>
      {capturedPiece && (
        <i className={'gg-unavailable'}/>
      )}
      <canvas ref={canvasRef} height={'100px'} width={'100px'}/>
    </div>
  );
};

export default LastCapturedPiece;
