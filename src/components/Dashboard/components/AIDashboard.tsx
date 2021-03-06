import React, { FC } from 'react';
import { useOpponentDashboardStyles } from './style';
import 'css.gg/icons/home.css';
import 'css.gg/icons/smile.css';
import 'css.gg/icons/check.css';
import 'css.gg/icons/add.css';
import 'css.gg/icons/remove.css';
import 'css.gg/icons/smile-neutral.css';
import { useDispatch, useSelector } from 'react-redux';
import DashboardButton from './DashboardButton';
import {
  gameSelector,
  GameTypes,
  gameTypeSelected,
  gameStarted,
} from '../../../redux/Game';
import { returnHome } from '../../../redux/App';
import { opponentSelector } from '../../../redux/Opponent';
import { useHistory } from 'react-router-dom';

import classNames from 'classnames';

export const AIDashboard: FC = () => {
  const classes = useOpponentDashboardStyles({});
  const dispatch = useDispatch();
  const history = useHistory();
  const { type } = useSelector(gameSelector);
  const { type: opponentType, isReady } = useSelector(opponentSelector);

  return (
    <div className={classes.root}>
      <DashboardButton
        classes={classes}
        className={classNames('chaos', {
          current: type === GameTypes.Chaos,
        })}
        label={'Chaos'}
        disabled={type === GameTypes.Chaos}
        icon={'smile'}
        onClick={() => dispatch(gameTypeSelected(GameTypes.Chaos))}
      />
      <DashboardButton
        classes={classes}
        className={classNames('regular', {
          current: type === GameTypes.Regular,
        })}
        label={'Regular'}
        disabled={type === GameTypes.Regular}
        icon={'smile-neutral'}
        onClick={() => dispatch(gameTypeSelected(GameTypes.Regular))}
      />
      <DashboardButton
        classes={classes}
        className={'home'}
        label={'Home'}
        icon={'home'}
        onClick={() => dispatch(returnHome())}
      />
      <DashboardButton
        classes={classes}
        className={'ready'}
        label={'Ready'}
        icon={'check'}
        disabled={!isReady}
        onClick={() => {
          dispatch(gameStarted({ opponent: opponentType, isWhite: true }));
          history.push('/game/vs-ai');
        }}
      />
    </div>
  );
};

export default AIDashboard;
