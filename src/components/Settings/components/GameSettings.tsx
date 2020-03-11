import React, { FC } from 'react';

interface GameSettingsProps {
  classes: any;
}

export const GameSettings: FC<GameSettingsProps> = ({
  classes,
}) => {

  return (
    <div className={classes.gameSettings}>

    </div>
  );
};

export default GameSettings;
