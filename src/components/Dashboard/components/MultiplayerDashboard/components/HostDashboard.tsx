import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { returnHome } from '../../../../../redux/App';
import DashboardButton from '../../DashboardButton';
import classNames from 'classnames';

interface HostDashboardProps {
  classes: any;
}

export const HostDashboard: FC<HostDashboardProps> = ({
  classes,
}) => {
  const dispatch = useDispatch();

  return (
    <div className={classNames(classes.userDashboard, 'host')}>
      <DashboardButton
        classes={classes}
        className={'home'}
        label={'Home'}
        icon={'home'}
        onClick={() => dispatch(returnHome())}
      />
      <DashboardButton
        classes={classes}
        className={'select-game'}
        label={'Select Game'}
        icon={'check'}
        onClick={console.log}
      />
    </div>
  );
};

export default HostDashboard;
