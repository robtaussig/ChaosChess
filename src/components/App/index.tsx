import React, { FC } from 'react';
import useStyles from './styles';
import Header from '../Header/';
import Board from '../Board/';
import Dashboard from '../Dashboard/';

interface AppProps {
  children?: any,
}

export const App: FC<AppProps> = () => {
  const classes = useStyles({});

  return (
    <div id={'app'} className={classes.root}>
      <Header/>
      <Board/>
      <Dashboard/>
    </div>
  );
};

export default App;
