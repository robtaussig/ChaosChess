import { makeStyles } from '@material-ui/styles';
import { Theme } from '../../../theme';

const rootStyles = (theme: Theme): any => ({
  backgroundColor: '#ffffff59',
  margin: 15,
  marginTop: 10,
  borderRadius: 15,
});

const buttonStyles = (theme: Theme): any => ({
  fontFamily: '"Oxanium"',
  display: 'flex',
  // flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px 0',
  borderRadius: '5px',
  backgroundColor: '#ffffffb3',
  '&:not(:disabled)': {
    cursor: 'pointer',
    boxShadow: '0px 0px 10px -5px black',
    transition: 'all 0.1s linear',
    '&:active': {
      boxShadow: '0px 0px 0px 0px black',
      transform: 'scale(0.98)',
    },
  },
  '&.current': {
    border: '5px solid #2c1782',
  },
  '& i': {
    marginRight: 15,
    '--ggs': 1.5,
  },
});

export const useMainScreenDashboardStyles = makeStyles((theme: Theme) => ({
  root: {
    ...rootStyles(theme),
    display: 'grid',
    gridTemplateAreas: `"vs-ai vs-human"
                        "settings close"`,
    gridTemplateRows: '1fr 1fr',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '20px',
    padding: 20,
    '& .vs-computer': {
      gridArea: 'vs-ai',
    },
    '& .vs-human': {
      gridArea: 'vs-human',
    },
    '& .settings': {
      gridArea: 'settings',
    },
    '& .close': {
      gridArea: 'close',
    },
  },
  dashboardButton: {
    ...buttonStyles(theme),
  },
}));

export const useInGameDashboard = makeStyles((theme: Theme) => ({
  root: {
    ...rootStyles(theme),
    display: 'grid',
    gridTemplateAreas: `"captured text"
                        "main-menu start-over"`,
    gridTemplateRows: '100px 1fr',
    gridTemplateColumns: '100px 1fr',
    gridGap: '20px',
    padding: 20,
    '& .main-menu': {
      gridArea: 'main-menu',
      '& i': {
        marginTop: 5,
        marginRight: 0,
      },
    },
    '& .start-over': {
      gridArea: 'start-over',
    },
  },
  dashboardButton: {
    ...buttonStyles(theme),
  },
  lastCapturedPiece: {
    gridArea: 'captured',
    position: 'relative',
    backgroundColor: 'transparent',
    borderRadius: '50%',
    '&.capturedPiece': {
      backgroundColor: '#ffffffb3',
    },
    '& i': {
      position: 'absolute',
      height: 100,
      width: 100,
      border: '4px solid',
      color: '#b70000a3',
      '&:after': {
        left: 45,
        height: 92,
        top: 0,
        width: 4,
        borderRadius: '0px',
      },
    },
  },
  inGameText: {
    gridArea: 'text',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    fontFamily: "Oxanium",
    '& span': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    '& .top': {
      flex: 1,
      color: '000000ad',
    },
    '& .bottom': {
      flex: 1,
      color: '#000075',
    },
  },
}));

export const useSettingsDashboard = makeStyles((theme: Theme) => ({
  root: {
    ...rootStyles(theme),
    display: 'grid',
    gridTemplateAreas: `"user game"
                        "guide home"`,
    gridTemplateRows: '1fr 1fr',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '20px',
    padding: 20,
    '& .home': {
      gridArea: 'home',
    },
    '& .user': {
      gridArea: 'user',
    },
    '& .game': {
      gridArea: 'game',
    },
    '& .guide': {
      gridArea: 'guide',
    },
  },
  dashboardButton: {
    ...buttonStyles(theme),
  },
}));

export const useOpponentDashboardStyles = makeStyles((theme: Theme) => ({
  root: {
    ...rootStyles(theme),
    display: 'grid',
    gridTemplateAreas: `"chaos regular"
                        "home ready"`,
    gridTemplateRows: '1fr 1fr',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '20px',
    padding: 20,
    '& .chaos': {
      gridArea: 'chaos',
    },
    '& .regular': {
      gridArea: 'regular',
    },
    '& .home': {
      gridArea: 'home',
    },
    '& .ready': {
      gridArea: 'ready',
    },
  },
  dashboardButton: {
    ...buttonStyles(theme),
  },
}));
