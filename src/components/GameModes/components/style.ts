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
  },
}));
