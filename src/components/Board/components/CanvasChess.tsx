import React, { FC, useEffect, useRef } from 'react';
import Game from '../../../gfx';
import {
  flippedBoard,
  flippedMoves,
  flippedPieces,
  flippedSquares,
  flipPos,
} from '../util';

interface CanvasChessProps {
  onMove: (from: number, to: number) => void;
  board: string;
  flipped: boolean;
  legalMoves: string[];
  validPiecesToMove: string[];
  squaresToHighlight: number[];
  canvasWidth: string,
  canvasHeight: string,
}

export const CanvasChess: FC<CanvasChessProps> = ({
  onMove,
  board,
  legalMoves,
  validPiecesToMove,
  squaresToHighlight,
  canvasWidth,
  canvasHeight,
  flipped,
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
    gameRef.current = new Game(canvasRef.current, (from: number, to: number) => {
      if (flipped) {
        return onMove(flipPos(from), flipPos(to));
      }

      return onMove(from, to);
    });
  }, [onMove, flipped]);

  useEffect(() => {
    gameRef.current.updateBoard(flippedBoard(board, flipped));
  }, [board, flipped]);

  useEffect(() => {
    if (gameRef.current) {
      if (gameRef.current.board) gameRef.current.board.isDragging = null;
      gameRef.current.updateLegalMoves(flippedMoves(legalMoves, flipped));
      gameRef.current.updateValidPieces(flippedPieces(validPiecesToMove, flipped));
      gameRef.current.updateSquaresToHighlight(flippedSquares(squaresToHighlight, flipped));
      gameRef.current.updateBoard(flippedBoard(board, flipped));
    }
  }, [legalMoves, validPiecesToMove, board, squaresToHighlight, flipped]);

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
