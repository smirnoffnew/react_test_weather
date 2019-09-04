import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import uuid from "uuid";
import axios from 'axios';

import { TextField, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import { 
    BASE_URL, 
    API_KEY, 
    ADD_LOCATION 
} from '../constants'


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



    const [inputLabel, setInputLabel] = useState('Enter location');

    const classes = useStyles();
    const textInput = React.createRef()

    const dispatch = useDispatch()


    function handleInputClick () {

        if (inputLabel !== 'Enter location') {
            
            setInputLabel('Enter location'); 
        }
    }


    function handleSearch () {

        if (textInput.current.value === '') {

            setInputLabel("You haven't entered anything yet");             
            return;
        }



        axios.get   (`${BASE_URL}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${textInput.current.value}`)

        .then( ({data})  => {

            const location =  `${data[0].LocalizedName}, ${data[0].AdministrativeArea.ID}`;
            const locationKey = data[0].Key;

            dispatch({ 

                type: ADD_LOCATION, 

                payload: {

                    location,
                    locationKey,
                    id: uuid.v4(),
                } 
            })

            textInput.current.value = ''
        })

        .catch( ({message}) => { 

            if (message === "Cannot read property 'LocalizedName' of undefined"){
                
                setInputLabel('The location was not found');                 
            }
            else {

                console.dir(message)
            }
            
        })

    }



    return (

        <div className={classes.wrapper}>

            <TextField 
           
                className={classes.textField}
                placeholder='San Francisco, CA'
                autoFocus
                variant="outlined"
                margin='dense'

                inputRef={textInput}
                label={inputLabel}
                error={inputLabel !== 'Enter location'}
                
                onClick={handleInputClick}
            />
            
            <Button 

                className={classes.button}
                variant="contained" 
                color="primary"

                onClick={handleSearch}
            >

                Search

            </Button>

        </div>

    )
}