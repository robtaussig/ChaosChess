import { makeStyles } from '@material-ui/styles';
import { Theme } from '../../theme';
import { BOARD_MARGIN } from './constants';

export default makeStyles((theme: Theme) => ({
  root: {
    margin: BOARD_MARGIN,
  },
}));
