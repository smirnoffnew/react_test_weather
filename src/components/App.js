import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import {
  MuiThemeProvider,
  CssBaseline,
  createMuiTheme,
  Paper,
  Container,
} from "@material-ui/core";
import { 
  pink, 
  indigo, 
  grey 
} from "@material-ui/core/colors";
import { makeStyles } from '@material-ui/core/styles';

import store from "../store";
import NewLocation from './NewLocation'
import Table from './Table'



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
    marginTop: "2rem",
    marginBottom: "2rem",
    padding: "10%",
  },

}));



export default () => {


    const classes = useStyles();


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


                <NewLocation />
                <Table />


              </Paper>
            </Container>
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
      
    );
};
