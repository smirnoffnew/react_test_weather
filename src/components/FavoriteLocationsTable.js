import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { 
    Table, 
    TableBody, 
    TableCell, 
    TableRow,
    Fab,
    Switch,
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

import {  
    BASE_URL, 
    API_KEY, 
    REMOVE_LOCATION 
} from '../constants'




export default () => {

    
    const [favoriteLocationsData, setFavoriteLocationsData] = useState([]); 
    const [ifShowTemperatureInF, setIfShowTemperatureInF] = useState(true)
    const favoriteLocationsList = useSelector(state => state.favoriteLocationsList)


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
    
    
                    return responses.map((location, index) => {
    
                        const locationData = location.data[0];
                        const icondId = String(locationData.WeatherIcon).length === 1 
                            ? 
                                `0${locationData.WeatherIcon}` 
                            :
                                locationData.WeatherIcon;
    
    
                        return {
    
                            location: favoriteLocationsList[index].location,
                            id: favoriteLocationsList[index].id,
    
                            temperatureF: locationData.Temperature.Imperial.Value,
                            temperatureC: locationData.Temperature.Metric.Value,
                            ifShowTemperatureF: true,
    
                            weatherText: locationData.WeatherText,
                            weatherIcon: `https://developer.accuweather.com/sites/default/files/${icondId}-s.png` ,
    
                        }
                    });
                  })
                )
    
                .then(data => {
                    
                    setFavoriteLocationsData(data)
                })
    
                .catch(e => { console.dir(e)} )
    
        };





        fetchWeather();
        

        // const watcher = setInterval(() => {
            
        //     fetchWeather();
        // }, 5000);


        // return () => {

        //     clearInterval(watcher);
        // };
          
        
    }, [favoriteLocationsList, favoriteLocationsList.length])



    return (

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
                                        >
                                            <DeleteIcon 
                                                onClick={() => { removeLocation(data.id) }}
                                            />
                                        </Fab>
                                    </TableCell>
                                    
                                </TableRow>
                            )
                        }

                    </TableBody>

                </Table>

        </div>
    )
}
