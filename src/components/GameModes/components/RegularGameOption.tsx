import React, { FC, useEffect, useRef } from 'react';
import { GameTypes } from '../../../redux/Game';
import { getGameInformation } from '../../../games';
import classNames from 'classnames';

interface RegularGameOptionProps {
  classes: any;
  selected: boolean;
  onSelect: () => void;
}

export const RegularGameOption: FC<RegularGameOptionProps> = ({
  classes,
  selected,
  onSelect,
}) => {
  const { gameName, description } = getGameInformation(GameTypes.Regular);
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
      disabled={Boolean(selected)}
    >
      <span className={classes.gameOptionName}>{gameName}</span>
      <span className={classes.gameOptionDescription}>{description}</span>
    </button>
  );
};

export default RegularGameOption;
