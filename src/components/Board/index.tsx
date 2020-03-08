import React, { FC } from 'react';
import useStyles from './styles';

export const Board: FC = () => {
  const classes = useStyles({});

  return (
    <main id={'board'} className={classes.root}>

    </main>
  );
};

export default Board;
