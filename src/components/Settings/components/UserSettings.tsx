import React, { FC } from 'react';
import AvatarOption from './AvatarOption';
import { Avatar } from '../../../redux/User';
import classNames from 'classnames';

interface UserSettingsProps {
  classes: any;
  inputtedName: string;
  setInputtedName: (value: string) => void;
  selectedAvatar: Avatar;
  setSelectedAvatar: (selected: Avatar) => void;
  submitted: boolean;
  avatar: Avatar;
  onSubmit: () => void;
}

export const UserSettings: FC<UserSettingsProps> = ({
  classes,
  inputtedName,
  setInputtedName,
  selectedAvatar,
  setSelectedAvatar,
  submitted,
  avatar,
  onSubmit,
}) => {

  const handleSelectAvatar = (choice: Avatar) => () => {
    navigator.vibrate(50);
    setSelectedAvatar(choice);
  };

  return (
    <div id={'settings'} className={classes.root}>
      <section className={classes.userSettings}>
        <span className={classes.name}>Enter a name:</span>
        <input
          className={classes.nameInput}
          type={'text'}
          value={inputtedName}
          aria-label={'name'}
          onChange={e => setInputtedName(e.target.value)}
        />
        <span className={classes.avatarOptions}>Select an Avatar</span>
        <AvatarOption
          avatar={Avatar.Bot}
          selected={selectedAvatar === Avatar.Bot}
          onSelect={handleSelectAvatar(Avatar.Bot)}
          classes={classes}
          rootClassName={classes.bot}
        />
        <AvatarOption
          avatar={Avatar.Boy}
          selected={selectedAvatar === Avatar.Boy}
          onSelect={handleSelectAvatar(Avatar.Boy)}
          classes={classes}
          rootClassName={classes.boy}
        />
        <AvatarOption
          avatar={Avatar.Girl}
          selected={selectedAvatar === Avatar.Girl}
          onSelect={handleSelectAvatar(Avatar.Girl)}
          classes={classes}
          rootClassName={classes.girl}
        />
      </section>
      <button
        className={classNames(classes.submit, {
          submitted,
        })}
        disabled={inputtedName === name && selectedAvatar === avatar}
        onClick={onSubmit}
      >
        <i className={`gg-check`}/>
      </button>
    </div>
    
  );
};

export default UserSettings;
