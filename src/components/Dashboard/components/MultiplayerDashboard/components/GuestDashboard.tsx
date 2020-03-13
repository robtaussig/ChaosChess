import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { returnHome } from '../../../../../redux/App';
import DashboardButton from '../../DashboardButton';
import classNames from 'classnames';

interface GuestDashboardProps {
  classes: any;
}

export const GuestDashboard: FC<GuestDashboardProps> = ({
  classes,
}) => {
  const dispatch = useDispatch();

  return (
    <div className={classNames(classes.userDashboard, 'guest')}>
      <DashboardButton
        classes={classes}
        className={'home'}
        label={'Home'}
        icon={'home'}
        onClick={() => dispatch(returnHome())}
      />
      <DashboardButton
        classes={classes}
        className={'ready-up'}
        label={'Ready up'}
        icon={'check'}
        onClick={console.log}
      />
    </div>
  );
};

export default GuestDashboard;
