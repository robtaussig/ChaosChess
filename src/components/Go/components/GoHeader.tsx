import React, { FC } from 'react';
import { useHeaderStyles } from '../style';
import 'css.gg/icons/shape-circle.css';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { connectionSelector, ReadyState } from '../../../redux/Connection';

export interface GoHeaderProps {
    
}

export const GoHeader: FC<GoHeaderProps> = () => {
    const classes = useHeaderStyles({});
    const { status } = useSelector(connectionSelector);
    
    return (
        <>
            <span className={classes.root}>Go</span>
            <i className={classNames('gg-shape-circle', {
                [classes.connected]: status === ReadyState.OPEN,
                [classes.connecting]: status === ReadyState.CONNECTING,
                [classes.closed]: status === ReadyState.CLOSED,
            })}/>
        </>
    );
};

export default GoHeader;
