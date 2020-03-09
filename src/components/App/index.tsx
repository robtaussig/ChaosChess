import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import Header from '../Header/';
import Main from '../Main/';
import Dashboard from '../Dashboard/';

interface AppProps {
  children?: any,
}

export const App: FC<AppProps> = () => {
  const classes = useStyles({});
  const state = useSelector(s => s);

  return (
    <div id={'app'} className={classes.root}>
      <Header/>
      <Main/>
      <Dashboard/>
    </div>
  );
};

export default App;
