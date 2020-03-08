import React, { FC } from 'react';
import { useStyles } from './styles';

interface BoardProps {
  
}

export const Board: FC<BoardProps> = () => {
  const classes = useStyles({});

  return (
    <main id={'board'} className={classes.root}>

    </main>
  );
};

export default Board;
