import React, { FC } from 'react';
import { useChaosGameModeStyles } from './style';
import { useSelector, useDispatch } from 'react-redux';
import { gameSelector, subGameTypeSelected, gameTypeSelected, GameTypes, ChaosGameTypes } from '../../../redux/Game';
import { CHAOS_GAME_OPTIONS } from '../../../games';
import ChaosGameOption from './ChaosGameOption';
import RegularGameOption from './RegularGameOption';

interface ChaosGameModeProps {
  includeRegular?: boolean;
  canSelect?: boolean;
}

export const ChaosGameMode: FC<ChaosGameModeProps> = ({
  includeRegular = false,
  canSelect = true,
}) => {
  const dispatch = useDispatch();
  const classes = useChaosGameModeStyles({});
  const { type, subType } = useSelector(gameSelector);
  
  return (
    <div id={'chaos-game-mode-types'} className={classes.root}>
      {CHAOS_GAME_OPTIONS.map(option => {
        return (
          <ChaosGameOption
            key={`${option}-game-option`}
            classes={classes}            
            option={option}
            selected={subType === option}
            onSelect={() => canSelect && dispatch(subGameTypeSelected(option))}
          />
        );
      })}
      {includeRegular && (
        <RegularGameOption
          classes={classes}
          selected={subType === ChaosGameTypes.None && type === GameTypes.Regular}
          onSelect={() => canSelect && dispatch(gameTypeSelected(GameTypes.Regular))}
        />
      )}
    </div>
  );
};

export default ChaosGameMode;
