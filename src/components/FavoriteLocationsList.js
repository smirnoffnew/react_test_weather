import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { 

    withWidth,
    Switch,
    Typography,

} from "@material-ui/core";


import {  

    TOGGLE_TEMPERATURE_TYPE,
    BASE_URL, 
    API_KEY, 

} from '../constants';

import LocationCards from './LocationsCards';
import LocationTable from './LocationsTable';



export default withWidth()(({width}) => {


    const [errorMessage, setErrorMessage] = useState(false)    
    const [favoriteLocationsData, setFavoriteLocationsData] = useState([]); 

    const favoriteLocationsList = useSelector(state => state.favoriteLocationsList);
    const isTemperatureInF = useSelector(state => state.isTemperatureInF);
  
    const dispatch = useDispatch()
    const handleToggleTemperatureType = () => {

        dispatch({ 

            type: TOGGLE_TEMPERATURE_TYPE, 
        }
    )
    };


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

        },  5*60*1000);


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

                        checked={isTemperatureInF}
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

                        <LocationCards 

                            favoriteLocationsData={favoriteLocationsData} 
                        />

                        :
                    
                        <LocationTable 
                        
                            favoriteLocationsData={favoriteLocationsData} 
                        />

                }
            
            </div>
    )
});

















// {
//     width === 'xs'

//     ?

//     <div>
        
//         {
//             favoriteLocationsData.map((data) => 
                

//                 <Card
//                     key={ data.id }
//                     raised
//                     style={{
                        
//                         background: data.isDayTime 
//                                     ?
//                                     'linear-gradient(to top left, #f37335, #fdc830 )'
//                                     :
//                                     'linear-gradient(to top left, #7f7fd5, #86a8e7, #91eae4)',

//                         marginTop: '1rem',
//                         marginBottom: '1rem',
//                     }}
//                 >
                
//                     <div className={classes.cardUpperSection}>

//                         <Typography 

//                             gutterBottom 
//                             variant="h6" 
//                             color='primary' 
//                             component="p"
//                         >

//                                 {data.location}

//                         </Typography>

//                         <span
//                             className={classes.deleteIconSpan} 
//                             onClick={() => { removeLocation(data.id) }}
//                         >

//                             <DeleteIcon 
//                                 color='secondary'
                                
//                             />

//                         </span>

//                     </div>


//                     <div className={classes.cardMiddleSection}>
                            
//                             <Typography 

//                                 variant="h5" 
//                                 color="textPrimary" 
//                                 component="span"
//                             >
//                                 {
//                                     ifShowTemperatureInF 
//                                     ? 
//                                         `${data.temperatureF}${String.fromCharCode(176)}` 
//                                     :
//                                         `${data.temperatureC}${String.fromCharCode(176)}`
//                                 }
                                
//                             </Typography>

//                             <img src={`${data.weatherIcon}`} alt='weather icon' />
//                     </div>


//                     <div className={classes.cardLowerSection}>

//                         <Typography 
//                             variant="body1" 
//                             color="textPrimary" 
//                             align="center"
//                             gutterBottom
//                             component="p"
//                         >

//                             {data.weatherText}

//                         </Typography>

//                     </div>

                    
//                 </Card>
//             )
//         }



//     </div>

//     :

//     <Table style={{ width: "100%", marginTop: '2rem' }}>

//         <TableBody>

//             {
//                 favoriteLocationsData.map((data, index) => 

//                     <TableRow key={Math.random()} style={isRowGrey(index)}>

//                         <TableCell>
//                             {data.location}
//                         </TableCell>

//                         <TableCell>
//                             {
//                                 ifShowTemperatureInF 
//                                 ? 
//                                     `${data.temperatureF}${String.fromCharCode(176)}` 
//                                 :
//                                     `${data.temperatureC}${String.fromCharCode(176)}`
//                             }
//                         </TableCell>

//                         <TableCell  padding='none'>
//                             {data.weatherText}
//                         </TableCell>

//                         <TableCell>
//                             <img src={`${data.weatherIcon}`} alt='weather icon' />
//                         </TableCell> 

//                         <TableCell>

//                             <Fab 
//                                 size="small" 
//                                 color="secondary"

//                                 onClick={() => { removeLocation(data.id) }}
//                             >
//                                 <DeleteIcon />                                                
//                             </Fab>

//                         </TableCell>
                        
//                     </TableRow>
//                 )
//             }

//         </TableBody>

//     </Table>
// }