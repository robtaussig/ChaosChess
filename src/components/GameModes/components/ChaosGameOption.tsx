import React, { FC } from 'react';
import { ChaosGameTypes, GameTypes } from '../../../redux/Game';
import { getGameInformation } from '../../../games';
import classNames from 'classnames';

interface ChaosGameOptionProps {
  classes: any;
  option: ChaosGameTypes;
  selected: boolean;
  onSelect: () => void;
}

export const ChaosGameOption: FC<ChaosGameOptionProps> = ({
  classes,
  option,
  selected,
  onSelect,
}) => {
  const { gameName, description } = getGameInformation(GameTypes.Chaos, option);
  
  return (
    <button
      className={classNames(classes.chaosGameOption, {
        selected,
      })}
      onClick={onSelect}
      disabled={Boolean(selected)}
    >
      <span className={classes.gameOptionName}>{gameName}</span>
      <span className={classes.gameOptionDescription}>{description}</span>
    </button>
  );
};

export default ChaosGameOption;
