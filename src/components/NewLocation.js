import React, { useState } from 'react';
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import { API_KEY, BASE_URL } from '../constants'


const useStyles = makeStyles(theme => ({

    wrapper: {

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center important!',
        justifyContent: 'center important!',
        marginBottom: '3rem',
    },

    textField: {

        marginTop: theme.spacing(0.2),
        marginRight: theme.spacing(1),
        width: '80%',

    },

    button: {

        height: '2.6rem',
        width: '20%'
    }
  }));



export default () => {


    const [inputErrorStatus, setInputErrorStatus] = useState(false);
    const [inputLabel, setInputLabel] = useState('Enter location');

    const classes = useStyles();
    const textInput = React.createRef()


    function handleInputClick () {

        if (inputErrorStatus) {
            
            setInputLabel('Enter location'); 
            setInputErrorStatus(false);
        }
    }


    function handleSearch () {

        if (textInput.current.value === '') {

            setInputLabel("You haven't entered anything yet"); 
            setInputErrorStatus(true);
            
            return;
        }

        
        axios.get   (`${BASE_URL}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${textInput.current.value}`)

        .then( ({data})  => {

            const result = {
                location: `${data[0].LocalizedName}, ${data[0].AdministrativeArea.ID}`,
                key: data[0].Key
            }

            console.dir(result)  // ACTION WILL BE HERE!!!
            textInput.current.value = ''
        })

        .catch( ({message}) => { 

            if (message === "Cannot read property 'LocalizedName' of undefined"){
                
                setInputLabel('The location was not found'); 
                setInputErrorStatus(true);
                
            }
            else {

                console.dir(message)
            }
            
        })

    }



    return (

        <div className={classes.wrapper}

        >
            <TextField 
           
                className={classes.textField}
                placeholder='San Francisco, CA'
                autoFocus
                variant="outlined"
                margin='dense'

                inputRef={textInput}
                label={inputLabel}
                error={inputErrorStatus}
                
                onClick={handleInputClick}
            />
            
            <Button 

                className={classes.button}
                variant="contained" 
                color="secondary"

                onClick={handleSearch}
            >
                Search
            </Button>

        </div>

    )

}
