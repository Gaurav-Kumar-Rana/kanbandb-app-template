import React, { useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    width: '80%',
    position: 'absolute',
    left: ' 10%',
    background: '#fff',
    boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
    borderRadius: '4px',
    bottom: '-50px',
  },
  addBtnContainer: {
    display: 'flex',
  },
  addBtn: {
    width: '100%',
    backgroundColor: '#00B883',
    height: '56px',
    borderRadius: 0,
    '&:hover': {
      backgroundColor: '#00B883',
    },
  },
  addTextbox: {
    width: '100%',
  },
}));

function AddNote(props) {
  const classes = useStyles();
  const textBoxRef = useRef(null);
  const { addToDoAction } = props;

  return (
    <Grid container spacing={2} justify="space-between" alignItems="center" className={classes.root}>
      <Grid item xs={8}>
        <TextField
          inputRef={textBoxRef}
          className={classes.addTextbox}
          label="Type here to add To-Do list"
          variant="outlined"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              addToDoAction(textBoxRef);
            }
          }}
        />
      </Grid>
      <Grid item xs={4} className={classes.addBtnContainer}>
        <Button
          className={classes.addBtn}
          variant="contained"
          color="primary"
          disableElevation
          onClick={() => {
            addToDoAction(textBoxRef);
          }}
        >
          Add New
        </Button>
      </Grid>
    </Grid>
  );
}

export default AddNote;
