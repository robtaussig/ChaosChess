import {
  findLegalMoves,
  isCheck,
} from '../';
import {
  DEFAULT_BOARD,
} from '../constants';
import {
  Color,
} from '../types';

describe('findLegalMoves', () => {
  it('It works for the opening move of the game', () => {
    const start = performance.now();
    const validMoves = findLegalMoves(DEFAULT_BOARD);
    const end = performance.now();

    console.log(end - start);

    expect(validMoves).toHaveLength(20);
  });
});

describe('isCheck', () => {
  it('It works for its basic use-case', () => {
    
  });
});
