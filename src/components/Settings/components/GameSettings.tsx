import React, { FC } from 'react';

interface GameSettingsProps {
  classes: any;
}

export const GameSettings: FC<GameSettingsProps> = ({
  classes,
}) => {

  return (
    <div id={'settings'} className={classes.root}>
      <section className={classes.gameSettings}>

      </section>
    </div>
  );
};

export default GameSettings;
