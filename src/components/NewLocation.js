import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import uuid from "uuid";
import axios from 'axios';

import { 

    TextField, 
    Button, 
    makeStyles, 
    withWidth 
} from "@material-ui/core";

import { 

    BASE_URL, 
    API_KEY, 
    ADD_LOCATION 
} from '../constants'



const useStyles = makeStyles(theme => ({

    wrapper: {

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '1rem',
        marginBottom: '1rem',
        width: '100%',

        [theme.breakpoints.up('sm')]: {

            marginTop: '3rem',
            marginBottom: '3rem',
            flexDirection: 'row',
          },
    },

    textField: {

        width: '100%',

        [theme.breakpoints.up('sm')]: {
            width: '80%',
            marginTop: theme.spacing(0.2),
            marginRight: theme.spacing(1),
          },

    },

    button: {

        marginTop: theme.spacing(1),
        width: '7rem',
        height: '2.4rem',

        [theme.breakpoints.up('sm')]: {
            marginTop: 0,
            height: '2.6rem',
            width: '20%',
          },
    }
  }));



export default withWidth()(({width}) => {



    const [inputLabel, setInputLabel] = useState('Enter location');

    const favoriteLocationsList = useSelector(state => state.favoriteLocationsList)
    const classes = useStyles();
    const textInput = React.createRef()
    const dispatch = useDispatch()

    
    const handleInputClick = () => {

        if (inputLabel !== 'Enter location') {
            
            setInputLabel('Enter location'); 
        }
    }

    const isLocationAlreadyOnList = (foundLocationKey) => {

        if (favoriteLocationsList.length === 0) {
            return false;
        }
         
        const result = favoriteLocationsList.find(location => {
            return location.locationKey === foundLocationKey
        })

        return result !== undefined ? true : false;
    }


    const handleSearch = () => {

        if (textInput.current.value === '') {

            setInputLabel("You haven't entered anything yet");             
            return;
        }

    
        
        axios.get   (`${BASE_URL}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${textInput.current.value}`)

        .then( ({data})  => {
            

            if (isLocationAlreadyOnList(data[0].Key)) {

                setInputLabel("This location is already on the list");
                return;
            }

            textInput.current.value = ''

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
                // size={ width === 'xs' ? 'small' : 'medium' }
                onClick={handleSearch}
            >

                Search

            </Button>

        </div>

    )
});