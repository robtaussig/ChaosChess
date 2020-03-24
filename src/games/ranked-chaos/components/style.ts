import { makeStyles } from '@material-ui/styles';

const containerStyles = (theme: any): any => ({
  position: 'fixed',
  zIndex: 10,
  left: 15,
  right: 15,
  backgroundColor: '#003469',
  // height of board is equal to 100vw, and header is 65px, so height of
  // dashboard area is the difference between the sum of those and 100vh
  height: 'calc(100vh - 100vw - 65px)',
  marginTop: 5,
  fontFamily: 'Oxanium',
  padding: 20,
  borderRadius: '5px',
  boxShadow: '0px 0px 20px 0px black',
  color: 'white',
})

export const useStyles = makeStyles((theme: any) => ({
  bettingModal: {
    ...containerStyles(theme),
    display: 'grid',
    gridTemplateAreas: `"budget"
                        "label"
                        "input"
                        "button"`,
    gridTemplateRows: 'max-content max-content 1fr max-content',
    gridTemplateColumns: '1fr',
    gridGap: '20px',
  },
  budget: {
    gridArea: 'budget',
  },
  label: {
    gridArea: 'label',
  },
  input: {
    gridArea: 'input',
    margin: 'auto',
    border: '1px solid black',
    fontSize: 30,
    textAlign: 'center',
    borderRadius: '4px',
  },
  button: {
    gridArea: 'button',
    fontSize: 30,
    padding: '10px 0',
    borderRadius: '4px',
    color: '#1e331a',
  },
  loading: {
    ...containerStyles(theme),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
