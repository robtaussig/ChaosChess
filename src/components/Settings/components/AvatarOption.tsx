import React, { FC } from 'react';
import { Avatar } from '../../../redux/User';
import 'css.gg/icons/bot.css';
import 'css.gg/icons/boy.css';
import 'css.gg/icons/girl.css';
import classNames from 'classnames';

interface AvatarOptionProps {
  classes: any;
  avatar: Avatar;
  selected: boolean;
  onSelect: () => void;
  rootClassName: string;
}

export const AvatarOption: FC<AvatarOptionProps> = ({
  classes,
  avatar,
  selected,
  onSelect,
  rootClassName,
}) => {

  return (
    <button
      className={classNames(classes.avatarOption, rootClassName, {
        selected,
      })}
      onClick={onSelect}
    >
      <i className={`gg-${avatar}`}/>
    </button>
  );
};

export default AvatarOption;
