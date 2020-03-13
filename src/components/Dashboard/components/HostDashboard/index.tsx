import React, { FC } from 'react';
import useStyles from './style';
import { useDispatch } from 'react-redux';
import { returnHome } from '../../../../redux/App';
import DashboardButton from '../DashboardButton';

interface HostDashboardProps {
  
}

export const HostDashboard: FC<HostDashboardProps> = () => {
  const classes = useStyles({});
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
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

export default HostDashboard;
