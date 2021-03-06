import { makeStyles } from '@material-ui/styles';
import { Theme } from '../../../theme';

const rootStyles = (theme: Theme): any => ({
  backgroundColor: 'rgba(255, 255, 255, 0.35)',
  margin: 15,
  marginTop: 10,
  borderRadius: 15,
  overflow: 'auto',
});

export const buttonStyles = (theme: Theme): any => ({
  fontFamily: '"Oxanium"',
  display: 'flex',
  // flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px 0',
  borderRadius: '5px',
  backgroundColor: 'rgba(255, 255, 255, 0.70)',
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
                        "settings enter"`,
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
    '& .enter': {
      gridArea: 'enter',
    },
    '& .cancel-room': {
      gridArea: 'settings',
    },
    '& .enter-room': {
      gridArea: 'enter',
    },
  },
  roomInput: {
    gridRow: '1 / span 1',
    gridColumn: '1 / -1',
    fontSize: 20,
    textAlign: 'center',
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
      backgroundColor: 'rgba(255, 255, 255, 0.70)',
    },
    '& i': {
      position: 'absolute',
      height: 100,
      width: 100,
      border: '4px solid',
      color: 'rgba(183, 0, 0, 0.64)',
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

export const useGoStyles = makeStyles((theme: Theme) => ({
  root: {
    ...rootStyles(theme),
    fontFamily: 'Oxanium',
    gridArea: 'dashboard',
    display: 'grid',
    position: 'relative',
    gridTemplateAreas: `"black pass-turn"
                        "white home"
                        "undo settings"`,
    gridTemplateRows: '1fr 1fr 1fr',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '20px',
    padding: 20,
    '& .main-menu': {
      gridArea: 'home',
    },
    '& .pass-turn': {
      gridArea: 'pass-turn',
    },
    '& .resign': {
      gridArea: 'home',
    },
    '& .undo': {
      gridArea: 'undo',
    },
    '& .settings': {
      gridArea: 'settings',
    },
  },
  focusBoardButton: {
    position: 'absolute',
    top: 4,
    left: 30,
    backgroundColor: 'transparent',
  },
  rotatable: {
    transition: 'all 0.3s ease-in-out',
    transformOrigin: '50% calc(100% + 20px)',
    '&.hidden': {
      transform: 'rotate(180deg)',
      opacity: 0,
      visibility: 'hidden',
    },
    '&.moved': {
      position: 'absolute',
      top: 'calc(100% - 40px)',
      left: 'calc(100% - 50px)',
    },
  },
  connectedIcon: {
    position: 'absolute',
    top: 6,
    left: 6,
    '&.connected': {
      color: 'limegreen',
    },
    '&.connecting': {
      color: 'gold',
    },
    '&.closed': {
      color: 'red',
    },
  },
  opponentName: {
    marginLeft: 10,
    color: 'rgba(85, 255, 247, 0.81)',
  },
  colorSpace: {
    display: 'grid',
    gridTemplateAreas: `"player player"
                        "color score"`,
    gridTemplateRows: 'max-content 1fr',
    gridTemplateColumn: '1fr max-content',
    alignItems: 'center',
    fontSize: 30,
    fontWeight: 600,
    borderBottom: '4px solid transparent',
    borderTop: '4px solid transparent',
    '&.white': {
      gridArea: 'white',
    },
    '&.black': {
      gridArea: 'black',
    },
    '&.currentTurn': {
      borderBottom: '4px solid #000094',
    },
    '&.winner': {
      backgroundColor: '#000094',
      color: 'white',
    },
  },
  playerName: {
    gridArea: 'player',
    display: 'none',
    fontSize: 14,
    '&.isPlayer': {
      color: 'rgba(255, 255, 255, 0.86)',
    },
    '&.isOpponent': {
      color: 'rgba(255, 137, 137, 0.84)',
    },
    '&.hasPlayer': {
      display: 'flex',
    },
  },
  visibilityToggle: {
    position: 'absolute',
    top: 5,
    left: 5,
    background: 'transparent',
    '&.isOn': {

    },
  },
  colorHeader: {
    gridArea: 'color',
  },
  colorValue: {
    gridArea: 'score',
    marginLeft: 'auto',
    
  },
  dashboardButton: {
    ...buttonStyles(theme),
  },
}));

export const useGoSettingsStyle = makeStyles((theme: any) => ({
  root: {
    ...rootStyles(theme),
    display: 'grid',
    gridArea: 'dashboard',
    fontFamily: 'Oxanium',
    gridTemplateAreas: `"header color"
                        "difficulty difficulty"
                        "room board-size"
                        "join back"`,
    gridTemplateRows: '1fr 1fr 1fr 1fr',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '20px',
    padding: 20,
    '&.hidden': {
      transform: 'rotate(-180deg)',
    },
    '& .back': {
      gridArea: 'back',
    },
    '& .join': {
      gridArea: 'join',
    },
  },
  difficultyOptions: {
    gridArea: 'difficulty',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  difficultyHeader: {
    fontWeight: 600,
  },
  difficultyOption: {
    display: 'flex',
  },
  joinedText: {

  },
  dashboardButton: {
    ...buttonStyles(theme),
  },
  boardSize: {
    gridArea: 'board-size',
    display: 'flex',
    flexDirection: 'column',
  },
  userColor: {
    gridArea: 'color',
    display: 'flex',
    flexDirection: 'column',
  },
  roomInput: {
    gridArea: 'room',
  },
  joinedRoom: {
    gridArea: 'room',
  },
  joinButton: {

  },
  header: {
    gridArea: 'header',
    fontSize: 30,
    fontWeight: 600,
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
    '& .drop-table': {
      gridArea: 'chaos',
    },
    '& .create-table': {
      gridArea: 'regular',
    },
  },
  dashboardButton: {
    ...buttonStyles(theme),
  },
}));
