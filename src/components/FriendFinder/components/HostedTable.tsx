import React, { FC } from 'react';
import { Avatar } from '../../../redux/User';
import classNames from 'classnames';
import DashboardButton from '../../Dashboard/components/DashboardButton';

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

  return (
    <div className={classNames(classes.hostedTable, {
      isUser: isUserTable,
    })}>
      <i className={`gg-${avatar}`}/>
      <span className={classes.name}>{name}</span>
      {!isUserTable && (
        <DashboardButton
          label={'Join'}
          classes={classes}
          className={'join-button'}
          icon={'check'}
          onClick={() => onJoin(uuid)}
        />
      )}
    </div>
  );
};

export default HostedTable;
