import React, { FC, useEffect, useRef } from 'react';
import { ChaosGameTypes, GameTypes } from '../../../redux/Game';
import { getGameInformation } from '../../../games';
import classNames from 'classnames';

interface ChaosGameOptionProps {
  classes: any;
  option: ChaosGameTypes;
  selected: boolean;
  onSelect: () => void;
  disabled: boolean;
}

export const ChaosGameOption: FC<ChaosGameOptionProps> = ({
  classes,
  option,
  selected,
  onSelect,
  disabled,
}) => {
  const { gameName, description } = getGameInformation(GameTypes.Chaos, option);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selected) {
      buttonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selected]);

  return (
    <button
      ref={buttonRef}
      className={classNames(classes.chaosGameOption, {
        selected,
      })}
      onClick={onSelect}
      disabled={Boolean(selected || disabled)}
    >
      <span className={classes.gameOptionName}>{gameName}</span>
      <span className={classes.gameOptionDescription}>{description}</span>
    </button>
  );
};

export default ChaosGameOption;
