import { makeStyles } from '@material-ui/styles';
import { Theme } from '../theme';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.background,
    height: '100%',
    width: '100%',
  },
}));
