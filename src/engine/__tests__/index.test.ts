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
    const validMoves = findLegalMoves(DEFAULT_BOARD);

    expect(validMoves).toHaveLength(20);
  });

  it('Test castling out of position', () => {
    const validMoves = findLegalMoves('00000000000--------00-b---p--00--pP----00K------k00p-PBp--Q00P-N---P-00------r-00--------0000000000010000005658');

    expect(validMoves).toHaveLength(1);
  })

  it('It performs within expected range', () => {
    const start = performance.now();
    for (let i = 0; i < 100; i++) {
      findLegalMoves('00000000000--------00-b---p--00--pP----00K------k00p-PBp--Q00P-N---P-00------r-00--------0000000000010000005658');
    }

    const end = performance.now();

    expect(end - start).toBeLessThan(200);
  })
});

describe('isCheck', () => {
  it('It works for its basic use-case', () => {
    
  });
});
