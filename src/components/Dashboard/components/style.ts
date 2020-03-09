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
                        "settings settings"`,
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
  },
  dashboardButton: {
    ...buttonStyles(theme),
  },
}));

export const useInGameDashboard = makeStyles((theme: Theme) => ({
  root: {
    ...rootStyles(theme),
    display: 'grid',
    gridTemplateAreas: `"text-left text-right"
                        "start-over start-over"`,
    gridTemplateRows: '1fr 1fr',
    gridTemplateColumns: '1fr max-content',
    gridGap: '20px',
    padding: 20,
    '& .start-over': {
      gridArea: 'start-over',
    },
  },
  dashboardButton: {
    ...buttonStyles(theme),
  },
  inGameDashboardText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    fontFamily: "Oxanium",
  },
}));

export const useSettingsDashboard = makeStyles((theme: Theme) => ({
  root: {
    ...rootStyles(theme),
    display: 'grid',
    gridTemplateAreas: `". ."
                        "home home"`,
    gridTemplateRows: '1fr 1fr',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '20px',
    padding: 20,
    '& .home': {
      gridArea: 'home',
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
