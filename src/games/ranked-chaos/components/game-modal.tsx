import React, { FC, useState } from 'react';
import { useStyles } from './style';
import { Board, Color } from '../../../engine/types';
import { GamePhase } from '../types';
import 'css.gg/icons/spinner.css';

interface GameModalProps {
  board: Board;
  isHost: boolean;
  color: Color;
  phase: GamePhase;
  onBet: (amount: number) => void;
}

export const GameModal: FC<GameModalProps> = ({
  board,
  isHost,
  color,
  phase,
  onBet,
}) => {
  const classes = useStyles({});
  const [bet, setBet] = useState<string>('');
  const [isWaiting, setIsWaiting] = useState<boolean>(false);

  const handleClickBet = () => {
    onBet(Number(bet));
    setIsWaiting(true);
  };

  if (phase !== GamePhase.Playing && isWaiting) {
    return (
      <div className={classes.loading}>
        <i className={'gg-spinner'}/>
      </div>
    )
  } else if (phase === GamePhase.Betting) {
    return (
      <div className={classes.bettingModal}>
        <label htmlFor={'bet'} className={classes.label}>
          Set your bid on playing White (lowest bid plays white)          
        </label>
        <input
          className={classes.input}
          name={'bet'}
          type={'number'}
          min={'0'}
          max={'10'}
          value={bet}
          onChange={e => setBet(e.target.value)}
        />
        <button
          className={classes.button}
          disabled={bet === ''}
          onClick={handleClickBet}
        >
          Bet
        </button>
      </div>
    );
  }

  return null;
};

export default GameModal;
