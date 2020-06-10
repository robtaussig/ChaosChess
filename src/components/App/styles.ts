import { makeStyles } from '@material-ui/styles';
import { Theme } from '../../theme';

export default makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    width: '100vw',
    display: 'grid',
    overflow: 'hidden',
    gridTemplateAreas: `"header"
                        "main"
                        "dashboard"`,
    gridTemplateRows: 'max-content calc(100vw - 30px) calc(100vh - 100vw + 30px)',
    gridTemplateColumns: '1fr',
    '& #header': {
      gridArea: 'header',
    },
    '& #board': {
      gridArea: 'main',
    },
    '& #game-modes': {
      gridArea: 'main',
    },
    '& #settings': {
      gridArea: 'main',
    },
    '& #friend-finder': {
      gridArea: 'main',
    },
    '& #dashboard': {
      gridArea: 'dashboard',
    },
  },
}));
