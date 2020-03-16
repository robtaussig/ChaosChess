import React, { FC } from 'react';
import classNames from 'classnames';

interface OptionProps {
  classes: any;
  icon: string;
  selected: boolean;
  onSelect: () => void;
  rootClassName: string;
}

export const Option: FC<OptionProps> = ({
  classes,
  icon,
  selected,
  onSelect,
  rootClassName,
}) => {

  return (
    <button
      className={classNames(classes.option, rootClassName, {
        selected,
      })}
      onClick={onSelect}
    >
      <i className={`gg-${icon}`}/>
    </button>
  );
};

export default Option;
