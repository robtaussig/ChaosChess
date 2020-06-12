import { Middleware, Store, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../types';
import { MessageTypes } from '../../redux/Connection';
import { SendMessage } from 'react-use-websocket';

export const dispatchBroadcast = (broadcast: SendMessage, action: PayloadAction<any>) => {
    broadcast(`${MessageTypes.GoMessage}||${JSON.stringify(action)}`);
};

export const goMiddleware: Middleware = (store: Store<RootState>) =>
    (next: (action: PayloadAction<any>) => void) =>
        (action: PayloadAction<any>) => {
            if (action?.payload?.broadcast) {
                const { goRoom, goId } = store.getState().go;
                if (goRoom) {
                    dispatchBroadcast(action.payload.broadcast, {
                        ...action,
                        payload: {
                            ...action.payload,
                            goOpponent: goId,
                        }
                    });
                }
                const { broadcast, ...payload } = action.payload;
                return next({
                    ...action,
                    payload,
                });
            } else {
                return next(action);
            }
        };
