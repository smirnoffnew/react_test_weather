import React from "react";
import {
  MuiThemeProvider,
  CssBaseline,
  createMuiTheme,
  Container,
} from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import { pink, indigo, grey } from "@material-ui/core/colors";

import NewLocation from './NewLocation'
import Table from './Table'
import { StyledPaper } from "../styles";


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


export default () => {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth="md">
            <StyledPaper component="div" elevation={2}>
              
              <NewLocation />
              <Table />

            </StyledPaper>
          </Container>
        </MuiThemeProvider>
      </BrowserRouter>
  );
};
