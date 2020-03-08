import React, { FC } from 'react';
import { useStyles } from './styles';

interface HeaderProps {
  
}

export const Header: FC<HeaderProps> = () => {
  const classes = useStyles({});

  return (
    <h1 id={'header'} className={classes.root}>
      ChaosChess
    </h1>
  );
};

export default Header;
