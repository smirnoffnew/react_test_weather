import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
// import { 
//     Typography, 
//     Button, 
//     Table, 
//     TableBody, 
//     TableCell, 
//     TableRow 
// } from "@material-ui/core";

import {  
    BASE_URL, 
    API_KEY, 
    REMOVE_LOCATION 
} from '../constants'



export default () => {


    const [favoriteLocationsData, setFavoriteLocationsData] = useState([]); 
    const favoriteLocationsList = useSelector(state => state.favoriteLocationsList)


    useEffect(() => {

        
        let promises = [];

        for (let i = 0; i < favoriteLocationsList.length; i++) {

            promises.push(

                axios.get(`${BASE_URL}/currentconditions/v1/${favoriteLocationsList[i].locationKey}?apikey=${API_KEY}`)
            );
        }

        axios.all(promises)

            .then(axios.spread((...responses) => {


                return responses.map(location => {

                    const locationData = location.data[0];

                    const icondId = locationData.WeatherIcon.length === 1 
                        ? 
                            '0' + locationData.WeatherIcon
                        :
                            locationData.WeatherIcon;


                    return {

                        temperatureF: locationData.Temperature.Imperial.Value,
                        temperatureC: locationData.Temperature.Metric.Value,

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
            


        // return () => {
        //     // cleanup
        // };
    }, [favoriteLocationsList])

    return (
        <div>

            
            {
                JSON.stringify(favoriteLocationsData)
            }
        </div>
    )
}

