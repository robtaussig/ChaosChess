import React, { FC, useState, useEffect } from 'react';
import useStyles from './styles';
import 'css.gg/icons/check.css';
import UserSettings from './components/UserSettings';
import GameSettings from './components/GameSettings';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector, userUpdated, Avatar } from '../../redux/User';
import { settingsSelector, SettingsType } from '../../redux/Settings';
import classNames from 'classnames';

export const Settings: FC = () => {
  const classes = useStyles({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { name, avatar } = useSelector(userSelector);
  const { type } = useSelector(settingsSelector);
  const [inputtedName, setInputtedName] = useState<string>(name);
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar>(avatar);
  
  const handleSubmit = () => {
    setSubmitted(true);
  
    dispatch(userUpdated({
      name: inputtedName,
      avatar: selectedAvatar,
    }));
  };

  useEffect(() => {
    setSubmitted(false);
  }, [inputtedName, selectedAvatar]);

  return (
    <div id={'settings'} className={classes.root}>
      {type === SettingsType.User && (
        <UserSettings
          classes={classes}
          inputtedName={inputtedName}
          setInputtedName={setInputtedName}
          selectedAvatar={selectedAvatar}
          setSelectedAvatar={setSelectedAvatar}
        />
      )}
      {type === SettingsType.Game && (
        <GameSettings
          classes={classes}
        />
      )}
      <button
        className={classNames(classes.submit, {
          submitted: submitted,
        })}
        disabled={inputtedName === name && selectedAvatar === avatar}
        onClick={handleSubmit}
      >
        <i className={`gg-check`}/>
      </button>
    </div>
  );
};

export default Settings;
