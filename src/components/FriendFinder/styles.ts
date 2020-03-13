import { makeStyles } from '@material-ui/styles';
import { buttonStyles } from '../Dashboard/components/style';

export default makeStyles((theme: any) => ({
  root: {
    backgroundColor: '#ffffff59',
    margin: 15,
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    overflow: 'auto',
  },
  name: {
    gridArea: 'name',
    display: 'flex',
    alignItems: 'center',
    marginLeft: 15,
    fontFamily: 'Oxanium',
    color: 'darkblue',
    fontWeight: 600,
  },
  hostedTable: {
    display: 'grid',
    gridTemplateAreas: `"avatar name button"`,
    gridTemplateColumns: '40px 1fr max-content',
    gridTemplateRows: '1fr',
    padding: 10,
    minHeight: 60,
    backgroundColor: '#ffffffa6',
    borderRadius: '2px',
    boxShadow: '0px 0px 5px -2px black',
    '&:not(:last-child)': {
      marginBottom: 20,
    },
    '& i': {
      gridArea: 'avatar',
      '--ggs': 1.5,
      margin: 'auto auto',
    },
    '& .join-button': {
      ...buttonStyles(theme),
      gridArea: 'button',
      padding: '0 20px',
      backgroundColor: '#005439',
      color: 'white',
      '& i': {
        '--ggs': 1,
      },
      '& span': {
        marginLeft: 20,
      },
    },
  },
}));
