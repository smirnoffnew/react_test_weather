import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { 
    makeStyles,
    withWidth,
    Table, 
    TableBody, 
    TableCell, 
    TableRow,
    Fab,
    Switch,
    Typography,
    Card,
    

} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

import {  
    BASE_URL, 
    API_KEY, 
    REMOVE_LOCATION 
} from '../constants'



const useStyles = makeStyles(theme => ({

    cardUpperSection: {

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '1rem 2rem 1rem 2rem',

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



export default withWidth()(({width}) => {

    const [errorMessage, setErrorMessage] = useState(false)    
    const [favoriteLocationsData, setFavoriteLocationsData] = useState([]); 
    const [ifShowTemperatureInF, setIfShowTemperatureInF] = useState(true)

    const favoriteLocationsList = useSelector(state => state.favoriteLocationsList);
    const classes = useStyles();

    const isRowGrey = (index) => ({ backgroundColor: index % 2 > 0 ? 'transparent' : '#EAE7E7' });
   
    const handleToggleTemperatureType = () => {

        setIfShowTemperatureInF(!ifShowTemperatureInF)
    };

    const dispatch = useDispatch()

    const removeLocation = (id) => {

        dispatch({ 

                type: REMOVE_LOCATION, 
                payload: { id } 
            }
        )
    }



    useEffect(() => {


        const fetchWeather = () => {

            let promises = [];
    
            for (let i = 0; i < favoriteLocationsList.length; i++) {
    
                promises.push(
    
                    axios.get(`${BASE_URL}/currentconditions/v1/${favoriteLocationsList[i].locationKey}?apikey=${API_KEY}`)
                );
            }
    
            axios.all(promises)
    
                .then(axios.spread((...responses) => {
    
    
                    return responses.map((receivedData, index) => {
    
                        const location = receivedData.data[0];
                        const icondId = String(location.WeatherIcon).length === 1 
                            ? 
                                `0${location.WeatherIcon}` 
                            :
                                location.WeatherIcon;
                            
                        return {
    
                            location: favoriteLocationsList[index].location,
                            id: favoriteLocationsList[index].id,
    
                            temperatureF: location.Temperature.Imperial.Value,
                            temperatureC: location.Temperature.Metric.Value,
                            ifShowTemperatureF: true,
    
                            weatherText: location.WeatherText,
                            weatherIcon: `https://developer.accuweather.com/sites/default/files/${icondId}-s.png` ,

                            isDayTime: location.IsDayTime,
    
                        }
                    });
                  })
                )
    
                .then(data => {
                    
                    setFavoriteLocationsData(data)
                })
    
                .catch( ({message}) => {

                    if(message === "Network Error") {

                        setErrorMessage(true)
                    }
                    
                    console.dir(message)
                })
    
        };




        fetchWeather();
        

        const watcher = setInterval(() => {
            
            fetchWeather();
        }, 5*60*1000);


        return () => {

            clearInterval(watcher);
        };
          
        
    }, [favoriteLocationsList, favoriteLocationsList.length])



    return (

        errorMessage 

            ?

            <Typography
                variant='body1'
                color='secondary'
            >
                
                The limit of requests of this api key exceeded.

            </Typography>

            :


            <div>

                <div>

                    <label>
                        Celcius
                    </label>

                    <Switch

                        checked={ifShowTemperatureInF}
                        onChange={handleToggleTemperatureType}
                        color="primary"
                    />

                    <label>
                        Fahrenheit
                    </label>

                </div>

                
                {
                    width === 'xs'

                    ?

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

                                        <span onClick={() => { removeLocation(data.id) }}>

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
                                                    ifShowTemperatureInF 
                                                    ? 
                                                        `${data.temperatureF} ${String.fromCharCode(176)}F` 
                                                    :
                                                        `${data.temperatureC} ${String.fromCharCode(176)}C`
                                                }
                                                
                                            </Typography>

                                            <img src={`${data.weatherIcon}`} alt='weather icon' />
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

                    :

                    <Table style={{ width: "100%", marginTop: '2rem' }}>

                        <TableBody>

                            {
                                favoriteLocationsData.map((data, index) => 

                                    <TableRow key={Math.random()} style={isRowGrey(index)}>

                                        <TableCell>
                                            {data.location}
                                        </TableCell>

                                        <TableCell>
                                            {
                                                ifShowTemperatureInF 
                                                ? 
                                                    `${data.temperatureF} ${String.fromCharCode(176)}F` 
                                                :
                                                    `${data.temperatureC} ${String.fromCharCode(176)}C`
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {data.weatherText}
                                        </TableCell>

                                        <TableCell>
                                            <img src={`${data.weatherIcon}`} alt='weather icon' />
                                        </TableCell> 

                                        <TableCell>

                                            <Fab 
                                                size="small" 
                                                color="secondary"

                                                onClick={() => { removeLocation(data.id) }}
                                            >
                                                <DeleteIcon />                                                
                                            </Fab>

                                        </TableCell>
                                        
                                    </TableRow>
                                )
                            }

                        </TableBody>

                    </Table>
                }

                

            </div>
    )
});
