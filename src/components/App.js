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


const mobileDeviceTheme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: pink[600],
    },
    background: {
      default: "#fff",
    },
  },
  "@global": {
    "html, body, #root": {
      width: "100%",
    },
  },
});


const largeDeviceTheme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: pink[400],
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

  title: {

    marginTop: '2rem',
  },

  paper: {

    height: "100%",
    width: '100%',
    padding: "5%",
    
    [theme.breakpoints.up('md')]: {
      marginTop: "2rem",
      marginBottom: "2rem",
      padding: "10%",
    },
  },

}));



export default withWidth()(({width}) => {


    const classes = useStyles();

    const renderComponents = () => {

      return (
        <>

          <Typography

            className={classes.title}
            variant={ width === 'xs' ? "h5" : "h4"}
            color="secondary"
            align="center"
            gutterBottom
          >

            Current Weather

          </Typography>

          <NewLocation />
          <FavoriteLocationsList />

        </>
      );
    }


    return (

      <Provider store={store}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <MuiThemeProvider theme={  width === 'xs' ? mobileDeviceTheme : largeDeviceTheme }>
            <CssBaseline />
             <Container maxWidth="md">

              {
                  width === 'xs' 
                  
                  ?
                  
                    renderComponents()

                  :

                    <Paper

                      className={classes.paper}
                      component="div" 
                      elevation={2}
                    >
    
                      {renderComponents()}
    
                    </Paper> 
              }

            </Container>
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
      
    );
});
