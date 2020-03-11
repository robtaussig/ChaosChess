import React, { FC } from 'react';
import { useChaosGameModeStyles } from './style';
import { useSelector, useDispatch } from 'react-redux';
import { gameSelector, subGameTypeSelected } from '../../../redux/Game';
import { CHAOS_GAME_OPTIONS } from '../../../games';
import ChaosGameOption from './ChaosGameOption';

export const ChaosGameMode: FC = () => {
  const dispatch = useDispatch();
  const classes = useChaosGameModeStyles({});
  const { subType } = useSelector(gameSelector);
  
  return (
    <div id={'chaos-game-mode-types'} className={classes.root}>
      {CHAOS_GAME_OPTIONS.map(option => {
        return (
          <ChaosGameOption
            key={`${option}-game-option`}
            classes={classes}
            option={option}
            selected={subType === option}
            onSelect={() => dispatch(subGameTypeSelected(option))}
          />
        );
      })}
    </div>
  );
};

export default ChaosGameMode;
