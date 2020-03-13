import React, { FC } from 'react';
import { Avatar } from '../../../redux/User';
import classNames from 'classnames';
import DashboardButton from '../../Dashboard/components/DashboardButton';
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

  return (
    <div className={classNames(classes.hostedTable, {
      isUser: isUserTable,
    })}>
      <i className={`gg-${avatar}`}/>
      <span className={classes.name}>{name}</span>
      {isUserTable ? (
        <DashboardButton
          label={'Your table'}
          classes={classes}
          className={'join-button'}
          icon={'spinner'}
          disabled
        />
      ) : (
        <DashboardButton
          label={'Join'}
          classes={classes}
          className={'join-button'}
          icon={'chevron-down-o'}
          onClick={() => onJoin(uuid)}
        />
      )}
    </div>
  );
};

export default HostedTable;
