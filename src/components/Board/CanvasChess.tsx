import React, { FC, useEffect, useRef } from 'react';
import Game from '../../game';

interface CanvasChessProps {
  onMove: (from: string, to: string) => void;
  board: string;
  legalMoves: string[];
  validPiecesToMove: string[];
  canvasWidth: string,
  canvasHeight: string,
}

export const CanvasChess: FC<CanvasChessProps> = ({
  onMove,
  board,
  legalMoves,
  validPiecesToMove,
  canvasWidth,
  canvasHeight,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game>(null);

  const handleTouchStart = (e: any) => {
    const touch = e.targetTouches[0];
    gameRef.current.registerDragStart(
      touch.clientX - canvasRef.current.offsetLeft,
      touch.clientY - canvasRef.current.offsetTop,
    );
  
    const receiveTouchMove = (touchEvent: any) => {
      gameRef.current.registerDrag(
        touchEvent.targetTouches[0].clientX - canvasRef.current.offsetLeft,
        touchEvent.targetTouches[0].clientY - canvasRef.current.offsetTop,
      );
    };

    const removeMouseMoveEventListener = () => {
      canvasRef.current.removeEventListener('touchmove', receiveTouchMove);
      canvasRef.current.removeEventListener('touchcancel', removeMouseMoveEventListener);
      canvasRef.current.removeEventListener('touchend', removeMouseMoveEventListener);
      gameRef.current.registerDragEnd();
    };

    canvasRef.current.addEventListener('touchmove', receiveTouchMove);
    canvasRef.current.addEventListener('touchcancel', removeMouseMoveEventListener);
    canvasRef.current.addEventListener('touchend', removeMouseMoveEventListener);
  };

  const handleMouseDown = (e: any) => {
    gameRef.current.registerDragStart(
      e.clientX - canvasRef.current.offsetLeft,
      e.clientY - canvasRef.current.offsetTop,
    );

    const receiveMouseMove = (mouseMoveEvent: any) =>
      gameRef.current.registerDrag(
        mouseMoveEvent.clientX - canvasRef.current.offsetLeft,
        mouseMoveEvent.clientY - canvasRef.current.offsetTop,
      );

    const removeMouseMoveEventListener = () => {
      canvasRef.current.removeEventListener('mousemove', receiveMouseMove);
      canvasRef.current.removeEventListener('mouseup', removeMouseMoveEventListener);
      canvasRef.current.removeEventListener('mouseleave', removeMouseMoveEventListener);
      gameRef.current.registerDragEnd();
    };
  
    canvasRef.current.addEventListener('mouseup', removeMouseMoveEventListener);
    canvasRef.current.addEventListener('mousemove', receiveMouseMove);
    canvasRef.current.addEventListener('mouseleave', removeMouseMoveEventListener);
  };

  useEffect(() => {
    canvasRef.current.onselectstart = function () { return false; };
    gameRef.current = new Game(canvasRef.current, onMove);
  }, []);

  useEffect(() => {
    gameRef.current.updateBoard(board);
  }, [board]);

  useEffect(() => {
    gameRef.current.updateLegalMoves(legalMoves);
  }, [legalMoves]);

  useEffect(() => {
    gameRef.current.updateValidPieces(validPiecesToMove);
  }, [validPiecesToMove]);

  return (
    <canvas
      width={canvasWidth}
      height={canvasHeight}
      ref={canvasRef}
      onTouchStart={handleTouchStart}
      onMouseDown={handleMouseDown}
    />
  );
};

export default CanvasChess;
