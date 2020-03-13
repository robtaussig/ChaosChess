import React, { FC } from 'react';
import { Avatar } from '../../../redux/User';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import DashboardButton from '../../Dashboard/components/DashboardButton';
import { connectionSelector, JoinPhase } from '../../../redux/Connection';
import 'css.gg/icons/chevron-down-o.css';
import 'css.gg/icons/spinner.css';

interface HostedTableProps {
  classes: any;
  isUserTable: boolean;
  avatar: Avatar;
  name: string;
  uuid: string;
  onJoin?: (uuid: string) => void;
}

export const HostedTable: FC<HostedTableProps> = ({
  classes,
  isUserTable,
  avatar,
  name,
  uuid,
  onJoin,
}) => {
  const { joinPhase, joinedTable} = useSelector(connectionSelector);
  const isJoining = joinPhase === JoinPhase.Requested;
  const isJoiningThisTable = isJoining && joinedTable === uuid;

  return (
    <div className={classNames(classes.hostedTable, {
      isUser: isUserTable,
    })}>
      <i className={`gg-${avatar}`}/>
      <span className={classes.name}>{name}</span>
      {isUserTable ? (
        <DashboardButton
          label={'Host'}
          classes={classes}
          className={'join-button'}
          icon={'spinner'}
          disabled
        />
      ) : (
        <DashboardButton
          label={isJoiningThisTable ? 'Joining...' : 'Join'}
          classes={classes}
          className={'join-button'}
          icon={'chevron-down-o'}
          disabled={isJoining}
          onClick={() => onJoin(uuid)}
        />
      )}
    </div>
  );
};

export default HostedTable;
