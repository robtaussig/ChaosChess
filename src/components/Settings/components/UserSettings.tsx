import React, { FC } from 'react';
import Option from './Option';
import 'css.gg/icons/bot.css';
import 'css.gg/icons/boy.css';
import 'css.gg/icons/girl.css';
import { Avatar } from '../../../redux/User';
import { userSettingStyles } from '../styles';
import classNames from 'classnames';

interface UserSettingsProps {
  inputtedName: string;
  setInputtedName: (value: string) => void;
  selectedAvatar: Avatar;
  setSelectedAvatar: (selected: Avatar) => void;
  submitted: boolean;
  isSubmitDisabled: boolean;
  onSubmit: () => void;
}

export const UserSettings: FC<UserSettingsProps> = ({
  inputtedName,
  setInputtedName,
  selectedAvatar,
  setSelectedAvatar,
  submitted,
  isSubmitDisabled,
  onSubmit,
}) => {
  const classes = userSettingStyles({});
  const handleSelectAvatar = (choice: Avatar) => () => {
    navigator.vibrate?.(10);
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
        <span className={classes.avatarOptions}>Select an avatar:</span>
        <Option
          icon={Avatar.Bot}
          selected={selectedAvatar === Avatar.Bot}
          onSelect={handleSelectAvatar(Avatar.Bot)}
          classes={classes}
          rootClassName={classes.bot}
        />
        <Option
          icon={Avatar.Boy}
          selected={selectedAvatar === Avatar.Boy}
          onSelect={handleSelectAvatar(Avatar.Boy)}
          classes={classes}
          rootClassName={classes.boy}
        />
        <Option
          icon={Avatar.Girl}
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
        disabled={isSubmitDisabled}
        onClick={onSubmit}
      >
        <i className={`gg-check`}/>
      </button>
    </div>
    
  );
};

export default UserSettings;
