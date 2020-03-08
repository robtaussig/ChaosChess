import { makeStyles } from '@material-ui/styles';
import { Theme } from '../../theme';

export default makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'grid',
    gridTemplateAreas: `"header"
                        "main"
                        "dashboard"`,
    gridTemplateRows: 'max-content 100vw 1fr',
    gridTemplateColumns: '1fr',
    '& #header': {
      gridArea: 'header',
    },
    '& #board': {
      gridArea: 'main',
    },
    '& #rules': {
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
