import React, { FC, useState, useEffect } from 'react';
import 'css.gg/icons/check.css';
import UserSettings from './components/UserSettings';
import GameSettings from './components/GameSettings';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector, userUpdated, Avatar } from '../../redux/User';
import { settingsSelector, settingsUpdated, SettingsType, DifficultyType } from '../../redux/Settings';

export const Settings: FC = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { name, avatar } = useSelector(userSelector);
  const {
    type,
    difficulty,
    useMoveHistory,
    preferredGameMode,
  } = useSelector(settingsSelector);
  const [inputtedName, setInputtedName] = useState<string>(name);
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar>(avatar);
  const [inputtedDifficulty, setInputtedDifficulty] = useState<DifficultyType>(difficulty);
  const [inputtedMoveHistory, setInputtedMoveHistory] = useState<boolean>(useMoveHistory);
  const [inputtedPreferredGameMode, setInputtedPreferredGameMode] = useState<string>(preferredGameMode);
  
  const handleSubmit = () => {
    setSubmitted(true);
  
    dispatch(userUpdated({
      name: inputtedName,
      avatar: selectedAvatar,
    }));

    dispatch(settingsUpdated({
      difficulty: inputtedDifficulty,
      useMoveHistory: inputtedMoveHistory,
      preferredGameMode: inputtedPreferredGameMode,
    }));
  };

  useEffect(() => {
    setSubmitted(false);
  }, [inputtedName, selectedAvatar]);

  const isSubmitEnabled =
    inputtedName !== name ||
    selectedAvatar !== avatar ||
    inputtedDifficulty !== difficulty ||
    inputtedMoveHistory !== useMoveHistory ||
    inputtedPreferredGameMode !== preferredGameMode;

  return (
      <>
      {type === SettingsType.User && (
        <UserSettings          
          inputtedName={inputtedName}
          setInputtedName={setInputtedName}
          selectedAvatar={selectedAvatar}
          setSelectedAvatar={setSelectedAvatar}
          submitted={submitted}
          isSubmitDisabled={!isSubmitEnabled}
          onSubmit={handleSubmit}
        />
      )}
      {type === SettingsType.Game && (
        <GameSettings
          submitted={submitted}
          difficulty={inputtedDifficulty}
          setDifficulty={setInputtedDifficulty}
          moveHistory={inputtedMoveHistory}
          setMoveHistory={setInputtedMoveHistory}
          preferredGameMode={inputtedPreferredGameMode}
          setPreferredGameMode={setInputtedPreferredGameMode}
          isSubmitDisabled={!isSubmitEnabled}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default Settings;
