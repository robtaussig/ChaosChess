import React, { FC } from 'react';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { headerSelector } from '../../redux/Header';

export const Header: FC = () => {
  const classes = useStyles({});
  const headerText = useSelector(headerSelector);

  return (
    <h1 id={'header'} className={classes.root}>
      {headerText}
    </h1>
  );
};

export default Header;
