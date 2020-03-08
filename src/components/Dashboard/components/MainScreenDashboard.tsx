import React, { FC } from 'react';
import { useMainScreenDashboardStyles } from './style';
import { useDispatch } from 'react-redux';
import 'css.gg/icons/laptop.css';
import 'css.gg/icons/games.css';
import 'css.gg/icons/ruler.css';
import DashboardButton from './DashboardButton';
import { settingsOpened } from '../../../redux/Settings';
import { setUpVsAI, setUpVsHuman } from '../../../redux/Game';

export const MainScreenDashboard: FC = () => {
  const classes = useMainScreenDashboardStyles({});
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <DashboardButton
        classes={classes}
        className={'vs-computer'}
        icon={'laptop'}
        label={'vs AI'}
        onClick={() => dispatch(setUpVsAI())}
      />
      <DashboardButton
        classes={classes}
        className={'vs-human'}
        disabled
        label={'vs Human'}
        icon={'games'}
        onClick={() => dispatch(setUpVsHuman())}
      />
      <DashboardButton
        classes={classes}
        className={'settings'}
        label={'Settings'}
        icon={'ruler'}
        onClick={() => dispatch(settingsOpened())}
      />
    </div>
  );
};

export default MainScreenDashboard;
