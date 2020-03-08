import React, { FC } from 'react';
import classNames from 'classnames';

interface DashboardButtonProps {
  label: string;
  classes: any;
  className: string;
  icon: string;
  onClick: () => void;
  disabled?: boolean;
}

export const DashboardButton: FC<DashboardButtonProps> = ({
  label,
  classes,
  className,
  icon,
  onClick,
  disabled,
}) => {

  return (
    <button
      className={classNames(
        classes.dashboardButton,
        className,
      )}
      aria-label={label}
      onClick={onClick}
      disabled={Boolean(disabled)}
    >
      <i className={`gg-${icon}`}/>
      <span className={classes.dashbordButtonLabel}>{label}</span>
    </button>
  );
};

export default DashboardButton;
