import { makeStyles } from '@material-ui/styles';
import { Theme } from '../../theme';

export default makeStyles((theme: Theme) => ({
  root: {
    color: '#212121',
    fontSize: 50,
    display: 'flex',
    padding: '15px 0',
    paddingBottom: 0,
    justifyContent: 'center',
    position: 'relative',
  },
  homeButton: {
    backgroundColor: 'transparent',
    color: 'white',
    position: 'absolute',
    right: 30,
    top: '50%',
    '--ggs': 1.5,
  },
}));
