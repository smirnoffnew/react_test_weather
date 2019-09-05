import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';

import {
  
  MuiThemeProvider,
  CssBaseline,
  createMuiTheme,
  Paper,
  Container,
  Typography,
  withWidth,
} from "@material-ui/core";

import {

  pink, 
  indigo, 
  grey, 
} from "@material-ui/core/colors";


import store from "../store";
import NewLocation from './NewLocation'
import FavoriteLocationsList from './FavoriteLocationsList'



const theme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: pink[600],
    },
    background: {
      paper: "#fff",
      default: grey[100],
    },
  },
  "@global": {
    "html, body, #root": {
      width: "100%",
    },
  },
});

const useStyles = makeStyles(theme => ({

  paper: {
    height: "auto",
    padding: "5%",
    marginTop: "1rem",

    [theme.breakpoints.up('md')]: {
      marginTop: "2rem",
      marginBottom: "2rem",
      padding: "10%",
    },
  },



}));



export default withWidth()(({width}) => {


    const classes = useStyles();
    
    const adaptiveStyles = ( small, large ) => {
      
      return width === 'sm' || width === 'xs' ? small : large
    }


    return (

      <Provider store={store}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
             <Container maxWidth="md">
             <Paper 
                className={classes.paper}
                component="div" 
                elevation={2}>

                <Typography 
                  variant = { adaptiveStyles('h6', 'h4') } 
                  color='secondary'
                  align='center'
                  gutterBottom 
                >
                  Current Weather
                </Typography>

                <NewLocation />
                <FavoriteLocationsList />


              </Paper> 
            </Container>
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
      
    );
});
