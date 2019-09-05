import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { 

    Table, 
    TableBody, 
    TableCell, 
    TableRow,
    Fab,


} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

import {  

    REMOVE_LOCATION 

} from '../constants';




export default function LocationsTable({ favoriteLocationsData }) {
    
    const isTemperatureInF = useSelector(state => state.isTemperatureInF);

    const dispatch = useDispatch()

    const isRowGrey = (index) => ({ backgroundColor: index % 2 > 0 ? 'transparent' : '#EAE7E7' })

    const removeLocation = (id) => {

        dispatch({ 

                type: REMOVE_LOCATION, 
                payload: { id } 
            }
        )
    }

    console.log('render')

    return (
        
        <Table 
            
            style={{ 
                
                width: "100%", 
                marginTop: '2rem' 
            }}
        >

                        <TableBody>

                            {
                                favoriteLocationsData.map((data, index) => 

                                    <TableRow key={Math.random()} style={isRowGrey(index)}>

                                        <TableCell>
                                            {data.location}
                                        </TableCell>

                                        <TableCell>
                                            {
                                                isTemperatureInF 
                                                ? 
                                                    `${data.temperatureF}${String.fromCharCode(176)}` 
                                                :
                                                    `${data.temperatureC}${String.fromCharCode(176)}`
                                            }
                                        </TableCell>

                                        <TableCell  padding='none'>
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

    )
}
