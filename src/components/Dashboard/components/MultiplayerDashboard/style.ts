import { makeStyles } from '@material-ui/styles';
import { buttonStyles } from '../style';

export default makeStyles((theme: any) => ({
  root: {
    margin: 15,
    display: 'grid',
    padding: 20,
    gridRowGap: '20px',
    gridColumnGap: '5px',
    marginTop: 10,
    borderRadius: '15px',
    backgroundColor: '#rgba(255, 255, 255, 0.35)',
    gridTemplateAreas: `"player vs opponent"
                        "dashboard dashboard dashboard"`,
    gridTemplateRows: '1fr 1fr',
    gridTemplateColumns: '1fr max-content 1fr',
  },
  userDashboard: {
    display: 'grid',
    gridColumnGap: '27px',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr', 
    gridArea: 'dashboard',
    '&.host': {

    },
    '&.guest': {

    },
  },
  vsText: {
    gridArea: 'vs',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Oxanium',
  },
  dashboardButton: {
    ...buttonStyles(theme),
  },
  playerCard: {    
    '&.player': {
      gridArea: 'player',
    },
    '&.opponent': {
      gridArea: 'opponent',
    },
    '&.isReady': {
      backgroundColor: '#a3ffa3',
    },
  },
}));
