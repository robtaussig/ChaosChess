import { makeStyles } from '@material-ui/styles';
import { Theme } from '../../theme';
import { BOARD_MARGIN } from './constants';

export default makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: 'white',
    margin: BOARD_MARGIN,
  },
}));
