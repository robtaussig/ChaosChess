export const positionString = (from: number, to: number) => `${from}-${to}`;

export const getUniqueItemsFromArray = <T>(items: T[] = []): T[] => {
  return [...new Set<T>(items)];
};

export const getValidPiecesToMoveFromLegalMoveList =
  (moves: string[]): string[] => {
    return getUniqueItemsFromArray(moves?.map(move => move.split('-')[0]));
  };
