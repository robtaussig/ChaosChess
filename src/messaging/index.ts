import { SendMessage } from '../hooks/useSocket';
import {
  MessageTypes,
  JoinMessage,
  RenameMessage,
  DisconnectedMessage,
  messageReceived,
} from '../redux/Connection';
import { syncGameStateWithHost, GameState, gameStarted, GameStartedPayload } from '../redux/Game';
import { syncOpponentStateWithGuest, OpponentState, OpponentType } from '../redux/Opponent';
import { Avatar } from '../redux/User';
import { returnHome } from '../redux/App';
import { AppThunk } from '../redux/types';
import {
  expectResponse,
  respondToMessage,
  handleMessageResponse,
  Response,
} from './respond';
import { isMessageType } from './util';
import { moveCompleted, MakeMovePayload } from '../redux/Chess';
import messager from './dispatcher';

export const setName = (
  uuid: string,
  name: string,
  avatar: Avatar,
  sendMessage: SendMessage,
): void => {
  sendMessage(`/name ${name}-${avatar}-${uuid}`);
  sendMessage(`${MessageTypes.ChangedName}||${uuid}||${name}||${avatar}`);
};

export const joinRoom = (
  uuid: string,
  roomId: string,
  sendMessage: SendMessage,
): void => {
  sendMessage(`${MessageTypes.JoiningRoom}||${uuid}||${roomId}`); //Inform others in case you are host of room
  sendMessage(`/join ${roomId}`);
  sendMessage(`${MessageTypes.JoinedRoom}||${uuid}||${roomId}`);
};

export const inRoom = (
  sendMessage: SendMessage,
): void => {
  sendMessage(`${MessageTypes.InRoom}||`);
};

export const hostTable = (
  sendMessage: SendMessage,
): void => {
  sendMessage(`${MessageTypes.HostTable}||`);
};

export const dropTable = (
  sendMessage: SendMessage,
): void => {
  sendMessage(`${MessageTypes.DropTable}||`);
};

export const getTables = (
  sendMessage: SendMessage,
): void => {
  sendMessage(`${MessageTypes.GetTables}||`);
};

export const requestJoin = async (
  sendMessage: SendMessage,
  uuidToJoin: string,
  timeoutMs?: number,
): Promise<Response> => {
  return expectResponse(
    sendMessage,
    `${MessageTypes.RequestJoin}||`,
    uuidToJoin,
    timeoutMs,
  );
};

export const getInitialBoardFromHost = async (
  sendMessage: SendMessage,
  uuid: string,
): Promise<Response> => {
  return expectResponse(
    sendMessage,
    `${MessageTypes.GetBoard}`,
    uuid,
  );
};

export const syncGameMode = (
  sendMessage: SendMessage,
  gameType: any,
  subType: any,
): void => {
  sendMessage(`${MessageTypes.SelectGameType}||${gameType}||${subType}`);
};

export const syncHostWithReadyStatus = (
  sendMessage: SendMessage,
  isReady: boolean,
): void => {
  sendMessage(`${MessageTypes.SetReadyStatus}||${isReady}`);
}

export const syncGuestWithGameStarted = (
  sendMessage: SendMessage,
  isWhite: boolean,
): void => {
  sendMessage(`${MessageTypes.GameStarted}||${isWhite}`);
};

const getJoinMessageData = (message: string): JoinMessage['data'] => {
  const [,uuid, room] = message.split('||');
  return { uuid, room };
};

const getNameMessageData = (message: string): RenameMessage['data'] => {
  const [, uuid, name, avatar] = message.split('||');

  return {
    uuid,
    name,
    avatar: avatar as Avatar,
  };
};

const getNameMessageDataFromDisconnect =
  (message: string): DisconnectedMessage['data'] => {
    const [, uuidWithName] = message.split('||');
    const [name,, ...uuid] = uuidWithName.split('-');

    return {
      name,
      uuid: uuid.join('-'),
    };
  };

const getUuidAndNameFromMessage =
  (message: string): { name: string, avatar: Avatar, uuid: string } => {
    const [nameWithAvatarAndUuid,] = message.split(':');
    const [name, avatar, ...uuid] = nameWithAvatarAndUuid.split('-');

    return {
      name,
      avatar: avatar as Avatar,
      uuid: uuid.join('-'),
    };
  };

const getGameStateFromSelectGameTypeMessage =
  (message: string): Partial<GameState> => {
    const [, type, subType] = message.split('||');
    return {
      type,
      subType,
    } as Partial<GameState>;
  };

const getOpponentStateFromReadyStatusMessage =
  (message: string): Partial<OpponentState> => {
    const [,isReady] = message.split('||');
    return {
      isReady: isReady === 'true' ? true : false,
    };
  };

const getGameStartedDataFromMessage =
  (message: string): GameStartedPayload => {
    const [, isWhite] = message.split('||');
    return {
      opponent: OpponentType.Human,
      isWhite: isWhite === 'true' ? true : false,
    };
  };

const getMovePayloadFromMessage =
  (message: string): MakeMovePayload => {
    const [, stringifiedPayload] = message.split('||');

    return JSON.parse(stringifiedPayload);
  }

const getUuidAndRoomId =
  (message: string): { uuid: string, roomId: string } => {
    const [, messageData] = message.split(':');
    const [,uuid,roomId] = messageData.split('||');
    return { uuid, roomId };
  };

//TODO: Make more performant by extracting messageType once and comparing by string
export const receiveMessage = (
  message: string,
  respond: SendMessage,
): AppThunk<void> => (dispatch, getState) => {
  
  if (isMessageType<MessageTypes>(message, MessageTypes.Response)) {
    dispatch(handleMessageResponse(message));
  } else if (isMessageType<MessageTypes>(message, MessageTypes.ResponseExpected)) {
    dispatch(respondToMessage(message, respond));
  } else if (isMessageType<MessageTypes>(message, MessageTypes.JoinedRoom)) {
    inRoom(respond);
    dispatch(messageReceived({
      type: MessageTypes.JoinedRoom,
      data: getJoinMessageData(message),
    }));
  } else if (isMessageType<MessageTypes>(message, MessageTypes.ChangedName)) {
    dispatch(messageReceived({
      type: MessageTypes.ChangedName,
      data: getNameMessageData(message),
    }));
  } else if (isMessageType<MessageTypes>(message, MessageTypes.InRoom)) {
    dispatch(messageReceived({
      type: MessageTypes.InRoom,
      data: getUuidAndNameFromMessage(message),
    }));
  } else if (isMessageType<MessageTypes>(message, MessageTypes.Disconnected)) {
    dispatch(messageReceived({
      type: MessageTypes.Disconnected,
      data: getNameMessageDataFromDisconnect(message),
    }));
  } else if (isMessageType<MessageTypes>(message, MessageTypes.HostTable)) {
    dispatch(messageReceived({
      type: MessageTypes.HostTable,
      data: getUuidAndNameFromMessage(message),
    }));
  } else if (isMessageType<MessageTypes>(message, MessageTypes.GetTables)) {
    const { connection } = getState();
    if (connection.hostedTable) {
      hostTable(respond);
    }
  } else if (isMessageType<MessageTypes>(message, MessageTypes.DropTable)) {
    dispatch(messageReceived({
      type: MessageTypes.DropTable,
      data: getUuidAndNameFromMessage(message),
    }));
  } else if (isMessageType<MessageTypes>(message, MessageTypes.JoiningRoom)) {
    const { uuid, roomId } = getUuidAndRoomId(message);
    const { connection, opponent } = getState();

    if (connection.roomId === uuid && connection.roomId !== roomId) {
      //TODO: Display notification informing of reason
      dispatch(returnHome());
    } else if (uuid === opponent.uuid && roomId !== connection.roomId) {
      dispatch(returnHome());
    }
  } else if (isMessageType<MessageTypes>(message, MessageTypes.SelectGameType)) {
    dispatch(
      syncGameStateWithHost(
        getGameStateFromSelectGameTypeMessage(message)
      )
    );
  } else if (isMessageType<MessageTypes>(message, MessageTypes.SetReadyStatus)) {
    dispatch(
      syncOpponentStateWithGuest(
        getOpponentStateFromReadyStatusMessage(message)
      )
    );
  } else if (isMessageType<MessageTypes>(message, MessageTypes.GameStarted)) {
    dispatch(
      gameStarted(
        getGameStartedDataFromMessage(message),
      )
    )
  } else if (isMessageType<MessageTypes>(message, MessageTypes.MakeMove)) {
    dispatch(moveCompleted(
      getMovePayloadFromMessage(message),
    ));
  } else {
    messager.dispatch(message);
  }
};
