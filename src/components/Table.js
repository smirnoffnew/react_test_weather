import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Typography, Button, Table, TableBody, TableCell, TableRow } from "@material-ui/core";

export default () => {

    
    const favoriteLocationsList = useSelector(state => state.favoriteLocationsList)


    // useEffect(() => {

    //     effect
    //     return () => {
    //         // cleanup
    //     };
    // }, [input])

    return (
        <div>

            
            {
                JSON.stringify(favoriteLocationsList)
            }
        </div>
    )
}

