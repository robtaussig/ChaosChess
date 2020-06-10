import { makeStyles } from '@material-ui/styles';

export const userSettingStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: '#rgba(255, 255, 255, 0.35)',
    padding: 20,
    borderRadius: 20,
    margin: 15,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    fontFamily: 'Oxanium',
    fontSize: 18,
  },
  userSettings: {
    height: '100%',
    width: '100%',
    display: 'grid',
    gridGap: '15px',
    gridTemplateAreas: `"name name ."
                        "name-input name-input ."
                        "avatar avatar ."
                        "bot boy girl"`,
    gridTemplateRows: 'max-content max-content max-content 30vw',
    gridTemplateColumns: '1fr 1fr 1fr',
  },
  name: {
    gridArea: 'name',
  },
  nameInput: {
    gridArea: 'name-input',
    fontSize: 20,
  },
  avatarOptions: {
    gridArea: 'avatar',
  },
  bot: {
    gridArea: 'bot',
  },
  option: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    '& i': {
      '--ggs': 2,
    },
    '&.selected': {
      backgroundColor: '#2c1782',
      color: '#bbbbbb',
      borderRadius: '5px',
    },
  },
  boy: {
    gridArea: 'boy',
  },
  girl: {
    gridArea: 'girl',
  },
  submit: {
    marginTop: 'auto',
    padding: '15px 50px',
    borderRadius: '5px',
    '& i': {
      '--ggs': 2,
    },
    '&:not(:disabled)': {
      '&.submitted': {
        backgroundColor: '#005f00',
        color: 'white',
      },
    },
  },
  useMoveHistory: {

  },
}));

export const useGameSettingsStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: '#rgba(255, 255, 255, 0.35)',
    padding: 20,
    borderRadius: 20,
    margin: 15,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    fontFamily: 'Oxanium',
    fontSize: 18,
  },
  gameSettings: {
    height: '100%',
    width: '100%',
    display: 'grid',
    gridGap: '15px',
    gridTemplateAreas: `"move-history move-history move-history"
                        "preferred-game preferred-game preferred-game"
                        "difficulty difficulty ."
                        "beginner intermediate advanced"`,
    gridTemplateRows: 'max-content max-content max-content 30vw',
    gridTemplateColumns: '1fr 1fr 1fr',
  },
  useMoveHistory: {
    gridArea: 'move-history',
    height: 18,
  },
  preferredGame: {
    gridArea: 'preferred-game',
    '& select': {
      height: 29,
      border: '1px solid black',
      marginLeft: 15,
    },
  },
  difficultyOptions: {
    gridArea: 'difficulty',
  },
  option: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    '& i': {
      '--ggs': 2,
    },
    '&.selected': {
      backgroundColor: '#2c1782',
      color: '#bbbbbb',
      borderRadius: '5px',
    },
  },
  beginner: {
    gridArea: 'beginner',
  },
  intermediate: {
    gridArea: 'intermediate',
  },
  advanced: {
    gridArea: 'advanced',
  },
  submit: {
    marginTop: 'auto',
    padding: '15px 50px',
    borderRadius: '5px',
    '& i': {
      '--ggs': 2,
    },
    '&:not(:disabled)': {
      '&.submitted': {
        backgroundColor: '#005f00',
        color: 'white',
      },
    },
  },
}));
