import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { 
    makeStyles,
    Typography,
    Card,
    

} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

import {  
    REMOVE_LOCATION 
} from '../constants';



const useStyles = makeStyles(theme => ({

    cardUpperSection: {

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '1rem 2rem 1rem 2rem',

    },

    deleteIconSpan: {

        transform: 'translateY(-2.4px)',
    },

    cardMiddleSection: {

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '1rem',
        marginBottom: '1rem',
    },

    cardLowerSection: {

        margin: '1rem',
    }

  }));




export default function LocationsCards({ favoriteLocationsData }) {

    const isTemperatureInF = useSelector(state => state.isTemperatureInF);
    const dispatch = useDispatch()
    const classes = useStyles();


    const removeLocation = (id) => {

        dispatch({ 

                type: REMOVE_LOCATION, 
                payload: { id } 
            }
        )
    }


    return (
        
        <div>
                        
            {
                favoriteLocationsData.map((data) => 
                    

                    <Card
                        key={ data.id }
                        raised
                        style={{
                            
                            background: data.isDayTime 
                                        ?
                                        'linear-gradient(to top left, #f37335, #fdc830 )'
                                        :
                                        'linear-gradient(to top left, #7f7fd5, #86a8e7, #91eae4)',

                            marginTop: '1rem',
                            marginBottom: '1rem',
                        }}
                    >
                    
                        <div className={classes.cardUpperSection}>

                            <Typography 

                                gutterBottom 
                                variant="h6" 
                                color='primary' 
                                component="p"
                            >

                                    {data.location}

                            </Typography>

                            <span
                                className={classes.deleteIconSpan} 
                                onClick={() => { removeLocation(data.id) }}
                            >

                                <DeleteIcon 
                                    color='secondary'
                                    
                                />

                            </span>

                        </div>


                        <div className={classes.cardMiddleSection}>
                                
                                <Typography 

                                    variant="h5" 
                                    color="textPrimary" 
                                    component="span"
                                >

                                    {
                                        isTemperatureInF 
                                        ? 
                                            `${data.temperatureF}${String.fromCharCode(176)}` 
                                        :
                                            `${data.temperatureC}${String.fromCharCode(176)}`
                                    }
                                    
                                </Typography>

                                <img 
                                    src={`${data.weatherIcon}`} 
                                    alt='weather icon' 
                                />

                        </div>


                        <div className={classes.cardLowerSection}>

                            <Typography 
                                variant="body1" 
                                color="textPrimary" 
                                align="center"
                                gutterBottom
                                component="p"
                            >

                                {data.weatherText}

                            </Typography>

                        </div>

                        
                    </Card>
                )
            }



        </div>

    )
}
