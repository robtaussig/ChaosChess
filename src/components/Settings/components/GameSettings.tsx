import React, { FC } from 'react';
import { useGameSettingsStyles } from '../styles';
import classNames from 'classnames';
import Option from './Option';
import 'css.gg/icons/math-minus.css';
import 'css.gg/icons/math-equal.css';
import 'css.gg/icons/menu.css';
import { DifficultyType } from '../../../redux/Settings';

interface GameSettingsProps {
  submitted: boolean;
  difficulty: DifficultyType;
  setDifficulty: (difficulty: DifficultyType) => void;
  moveHistory: boolean;
  setMoveHistory: (useMoveHistory: boolean) => void;
  preferredGameMode: string;
  setPreferredGameMode: (gameMode: string) => void;
  isSubmitDisabled: boolean;
  onSubmit: () => void;
}

const GAME_MODES = ['', 'Chaos', 'Regular'];

export const GameSettings: FC<GameSettingsProps> = ({
  submitted,
  onSubmit,
  difficulty,
  setDifficulty,
  isSubmitDisabled,
  moveHistory,
  setMoveHistory,
  preferredGameMode,
  setPreferredGameMode,
}) => {
  const classes = useGameSettingsStyles({});

  const handleSelectDifficulty = (choice: DifficultyType) => () => {
    navigator.vibrate(10);
    setDifficulty(choice);
  };
  
  return (
    <div id={'settings'} className={classes.root}>
      <section className={classes.gameSettings}>
        <label className={classes.useMoveHistory}>
          <input
            type={'checkbox'}
            value={'useMoveHistory'}
            checked={moveHistory}
            onChange={e => setMoveHistory(e.target.checked)}
          />
          Use move history
        </label>
        <label className={classes.preferredGame}>
          Preferred game mode
          <select
            value={preferredGameMode}
            onChange={e => setPreferredGameMode(e.target.value)}
          >
            {GAME_MODES.map(gameMode => {
              return (
                <option key={`${gameMode}-game-mode`}>
                  {gameMode}
                </option>
              );
            })}
          </select>
        </label>
        <span className={classes.difficultyOptions}>Experience level:</span>
        <Option
          icon={'math-minus'}
          selected={difficulty === DifficultyType.Beginner}
          onSelect={handleSelectDifficulty(DifficultyType.Beginner)}
          classes={classes}
          rootClassName={classes.beginner}
        />
        <Option
          icon={'math-equal'}
          selected={difficulty === DifficultyType.Intermediate}
          onSelect={handleSelectDifficulty(DifficultyType.Intermediate)}
          classes={classes}
          rootClassName={classes.intermediate}
        />
        <Option
          icon={'menu'}
          selected={difficulty === DifficultyType.Advanced}
          onSelect={handleSelectDifficulty(DifficultyType.Advanced)}
          classes={classes}
          rootClassName={classes.advanced}
        />
      </section>
      <button
        className={classNames(classes.submit, {
          submitted,
        })}
        onClick={onSubmit}
        disabled={isSubmitDisabled}
      >
        <i className={`gg-check`}/>
      </button>
    </div>
  );
};

export default GameSettings;
