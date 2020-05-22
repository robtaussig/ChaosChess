import React, { FC, useState } from 'react';
import { useMainScreenDashboardStyles } from './style';
import { useDispatch } from 'react-redux';
import 'css.gg/icons/laptop.css';
import 'css.gg/icons/games.css';
import 'css.gg/icons/ruler.css';
import 'css.gg/icons/close.css';
import 'css.gg/icons/enter.css';
import DashboardButton from './DashboardButton';
import { setUpVsAI, setUpVsHuman } from '../../../redux/Game';
import { useHistory } from 'react-router-dom';

export const MainScreenDashboard: FC = () => {
  const classes = useMainScreenDashboardStyles({});
  const [enterRoomId, setEnterRoomId] = useState(false);
  const [roomInput, setRoomInput] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  if (enterRoomId) {
    return (
      <div className={classes.root}>
        <input
          className={classes.roomInput}
          onChange={e => setRoomInput(e.target.value)}
          value={roomInput}
          autoFocus
        />
        <DashboardButton
          classes={classes}
          key={'cancel-room'}
          className={'cancel-room'}
          icon={'close'}
          label={'Cancel'}
          onClick={() => setEnterRoomId(false)}
        />
        <DashboardButton
          classes={classes}
          key={'enter-room'}
          className={'enter-room'}
          icon={'check'}
          label={'Enter'}
          onClick={() => {
            history.push(`/room/${roomInput}`);
            setEnterRoomId(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <DashboardButton
        classes={classes}
        key={'vs-computer'}
        className={'vs-computer'}
        icon={'laptop'}
        label={'vs AI'}
        onClick={() => {
          dispatch(setUpVsAI());
          history.push('/vs-ai');
        }}
      />
      <DashboardButton
        classes={classes}
        key={'vs-human'}
        className={'vs-human'}
        label={'vs Human'}
        icon={'games'}
        onClick={() => {
          dispatch(setUpVsHuman());
          history.push('/vs-human');
        }}
      />
      <DashboardButton
        classes={classes}
        key={'settings'}
        className={'settings'}
        label={'Settings'}
        icon={'ruler'}
        onClick={() => history.push('/settings')}
      />
      <DashboardButton
        classes={classes}
        key={'enter'}
        className={'enter'}
        label={'Join'}
        icon={'enter'}
        onClick={() => setEnterRoomId(true)}
      />
    </div>
  );
};

export default MainScreenDashboard;
