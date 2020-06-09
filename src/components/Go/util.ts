const anchorMap: {
    [squaresPerSide: number]: {
        [row: number]: Set<number>;
    },
} = {
    9: {
        2: new Set([2, 6]),
        6: new Set([2, 6]),
        4: new Set([4]), 
    },
    19: {
        3: new Set([3, 9, 15]),
        9: new Set([3, 9, 15]),
        15: new Set([3, 9, 15]),
    },
};

export const isAnchorPoint = (squaresPerSide: number, row: number, column: number): boolean => {
    return anchorMap[squaresPerSide][row]?.has(column) ?? false;
};
