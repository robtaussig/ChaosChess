import { History } from 'history';

export const getRootPath = (history: History): string => {
    const withoutBase = history.location.pathname.substr(1);
    return withoutBase.split('/')[0];
};
