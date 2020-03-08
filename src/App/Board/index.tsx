import React, { FC } from 'react';
import { useStyles } from './styles';

interface BoardProps {
  
}

export const Board: FC<BoardProps> = () => {
  const classes = useStyles({});

  return (
    <div id={'board'} className={classes.root}>

    </div>
  );
};

export default Board;
