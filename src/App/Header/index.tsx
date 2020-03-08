import React, { FC } from 'react';
import { useStyles } from './styles';

interface HeaderProps {
  
}

export const Header: FC<HeaderProps> = () => {
  const classes = useStyles({});

  return (
    <div id={'header'} className={classes.root}>

    </div>
  );
};

export default Header;
