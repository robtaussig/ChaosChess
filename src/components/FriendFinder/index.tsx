import React, { FC, useEffect, useMemo } from 'react';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../../hooks/useSocket';
import { getTables } from '../../redux/Connection/actions';
import { connectionSelector, MessageTypes } from '../../redux/Connection';
import { Avatar, userSelector } from '../../redux/User';
import HostedTable from './components/HostedTable';

export const FriendFinder: FC = () => {
  const classes = useStyles({});
  const sendMessage = useSocket();
  const dispatch = useDispatch();
  const { messageHistory, hostedTable, uuid } = useSelector(connectionSelector);
  const { avatar, name } = useSelector(userSelector);

  const handleJoinTable = (uuid: string) => {
    console.log(uuid);
  };

  useEffect(() => {
    dispatch(getTables(sendMessage));
  }, [dispatch, sendMessage]);

  const tables = useMemo(() => {
    return Object.entries(messageHistory)
      .reduce((next, [, messages]) => {
        const messagesWithAvatar = messages.filter(({ data }: any) => {
          return data.avatar;
        });
        const latestMessageWithAvatar: any =
          messagesWithAvatar[messagesWithAvatar.length - 1];

        messages.forEach(message => {
          if (message.type === MessageTypes.HostTable) {
            const table = {
              ...message.data
            };
            if (latestMessageWithAvatar) {
              table.name = latestMessageWithAvatar.data.name;
              table.avatar = latestMessageWithAvatar.data.avatar;
            }
            next.push(table);
          }
        })
        return next;
      }, [] as { uuid: string, name: string, avatar: Avatar }[]);
  }, [messageHistory]);

  return (
    <div id={'friend-finder'} className={classes.root}>
      {hostedTable && (
        <HostedTable
          key={`${uuid}-hosted-table`}
          classes={classes}
          isUserTable={true}
          avatar={avatar}
          name={name}
          uuid={uuid}
        />
      )}
      {tables.map(table => {
        return (
          <HostedTable
            key={`${table.uuid}-hosted-table`}
            classes={classes}
            isUserTable={false}
            avatar={table.avatar}
            name={table.name}
            uuid={table.uuid}
            onJoin={handleJoinTable}
          />
        );
      })}
    </div>
  );
};

export default FriendFinder;
