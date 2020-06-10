import { Middleware, Store, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../types';
import { MessageTypes } from '../../redux/Connection';

export const goMiddleware: Middleware = (store: Store<RootState>) =>
    (next: (action: PayloadAction<any>) => void) =>
        (action: PayloadAction<any>) => {
            if (action?.payload?.broadcast) {
                const { goRoom } = store.getState().go;
                if (goRoom) {
                    action.payload.broadcast(`${MessageTypes.GoMessage}||${JSON.stringify(action)}`);
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
