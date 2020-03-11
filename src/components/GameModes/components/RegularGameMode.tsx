import React, { FC } from 'react';
import { useRegularGameModeStyles } from './style';

interface RegularGameModeProps {
  
}

export const RegularGameMode: FC<RegularGameModeProps> = () => {
  const classes = useRegularGameModeStyles({});

  return (
    <div id={'regular'} className={classes.root}>

    </div>
  );
};

export default RegularGameMode;
