import React, { FC } from 'react';
import 'css.gg/icons/chevron-left.css';
import { useGoSettingsStyle } from '../../style';
import DashboardButton from '../../DashboardButton';
import classNames from 'classnames';

export interface GoSettingsProps {
    className: string;
    onClose: () => void;
}

export const GoSettings: FC<GoSettingsProps> = ({
    className,
    onClose,
}) => {
    const classes = useGoSettingsStyle({});
    
    return (
        <div className={classNames(classes.root, className)}>
            <DashboardButton
                classes={classes}
                className={'back'}
                label={'Back'}
                icon={'chevron-left'}
                onClick={onClose}
            />
        </div>
    );
};

export default GoSettings;
