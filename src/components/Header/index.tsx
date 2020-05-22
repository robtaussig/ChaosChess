import React, { FC } from 'react';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { headerSelector } from '../../redux/Header';
import { Switch, Route } from 'react-router-dom';

export const Header: FC = () => {
  const classes = useStyles({});
  const headerText = useSelector(headerSelector);

  return (
    <h1 id={'header'} className={classes.root}>
      <Switch>
        <Route path={'/settings'}>
          Settings
        </Route>
        <Route path={'/vs-ai'}>
          Game Modes
        </Route>
        <Route path={'/vs-human'}>
          Find Opponent
        </Route>
        <Route path={'*'}>
          {headerText}
        </Route>
      </Switch>
    </h1>
  );
};

export default Header;
