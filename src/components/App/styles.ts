import { makeStyles } from '@material-ui/styles';
import { Theme } from '../../theme';

export default makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'grid',
    gridTemplateAreas: `"header"
                        "board"
                        "dashboard"`,
    gridTemplateRows: 'max-content 100vw 1fr',
    gridTemplateColumns: '1fr',
    '& #header': {
      gridArea: 'header',
    },
    '& #board': {
      gridArea: 'board',
    },
    '& #dashboard': {
      gridArea: 'dashboard',
    },
  },
}));
