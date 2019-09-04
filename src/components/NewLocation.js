import React from 'react'
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center important!',
        justifyContent: 'center important!',
        marginBottom: '3rem',
    },

    textField: {
        marginRight: theme.spacing(1),
        width: '80%',

    },

    button: {

        height: '2.6rem',
        width: '20%'
    }
  }));



export default () => {

    const classes = useStyles();

    return (

        <div className={classes.wrapper}

        >
            <TextField 
                className={classes.textField}
                autoFocus
                variant="outlined"
                margin='dense'
            />
            
            <Button 
                className={classes.button}
                variant="contained" 
                color="secondary"
            >
                Search
            </Button>

        </div>
    )
}
