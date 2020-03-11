import React, { FC } from 'react';
import { useSettingsDashboard } from './style';
import 'css.gg/icons/home.css';
import 'css.gg/icons/bot.css';
import 'css.gg/icons/file-document.css';
import 'css.gg/icons/boy.css';
import 'css.gg/icons/girl.css';
import 'css.gg/icons/performance.css';
import { useDispatch, useSelector } from 'react-redux';
import DashboardButton from './DashboardButton';
import { returnHome } from '../../../redux/App';
import { userSelector } from '../../../redux/User';
import { openHelp, HelpTypes, helpSelector } from '../../../redux/Help';
import {
  settingsSelector,
  SettingsType,
  typeSelected,
} from '../../../redux/Settings';
import classNames from 'classnames';

export const SettingsDashboard: FC = () => {
  const classes = useSettingsDashboard({});
  const { avatar } = useSelector(userSelector);
  const { type } = useSelector(settingsSelector);
  const { currentPage } = useSelector(helpSelector);
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <DashboardButton
        classes={classes}
        className={classNames('user', {
          current: type === SettingsType.User,
        })}
        label={'User'}
        disabled={type === SettingsType.User}
        icon={avatar}
        onClick={() => dispatch(typeSelected(SettingsType.User))}
      />
      <DashboardButton
        classes={classes}
        className={classNames('game', {
          current: type === SettingsType.Game,
        })}
        label={'Game'}
        disabled={type === SettingsType.Game}
        icon={'performance'}
        onClick={() => dispatch(typeSelected(SettingsType.Game))}
      />
      <DashboardButton
        classes={classes}
        className={'guide'}
        label={'Guide'}
        icon={'file-document'}
        onClick={() => dispatch(openHelp(HelpTypes.General))}
      />
      <DashboardButton
        classes={classes}
        className={'guide'}
        label={'Guide'}
        icon={'file-document'}
        onClick={() => dispatch(openHelp(HelpTypes.General))}
      />
      <DashboardButton
        classes={classes}
        className={'home'}
        label={'Home'}
        icon={'home'}
        onClick={() => dispatch(returnHome())}
      />
    </div>
  );
};

export default SettingsDashboard;
