import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme: any) => ({
  root: {
    backgroundColor: '#ffffff59',
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
  avatarOption: {
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
  gameSettings: {
    height: '100%',
    width: '100%',
    display: 'grid',
    gridGap: '15px',
    gridTemplateAreas: `". . ."
                        ". . ."
                        ". . ."
                        ". . ."`,
    gridTemplateRows: 'max-content max-content max-content 30vw',
    gridTemplateColumns: '1fr 1fr 1fr',
  },
  submit: {
    gridArea: 'submit',
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
