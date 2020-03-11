import { makeStyles } from '@material-ui/styles';

const rootStyles = () => ({
  backgroundColor: '#ffffff59',
  margin: 15,
});

export const useRegularGameModeStyles = makeStyles((theme: any) => ({
  root: {
    ...rootStyles(),
  },
}));

export const useChaosGameModeStyles = makeStyles((theme: any) => ({
  root: {
    ...rootStyles(),
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridAutoFlow: 'row',
    overflow: 'auto',
    gridRowGap: '20px',
  },
  chaosGameOption: {
    display: 'flex',
    padding: 12,
    alignItems: 'center',
    fontFamily: 'Oxanium',
    margin: '0px 20px',
    border: '5px solid transparent',
    '&:first-child': {
      marginTop: 20,
    },
    '&:last-child': {
      marginBottom: 20,
    },
    '&.selected': {
      border: '5px solid #2c1782',
    },
  },
  gameOptionName: {
    flex: 0,
    fontWeight: 600,
  },
  gameOptionDescription: {
    flex: 1,
    textAlign: 'left',
    marginLeft: 20,
  },
}));
