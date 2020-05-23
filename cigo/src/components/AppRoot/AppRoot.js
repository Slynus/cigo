import React from 'react';
import { Container, Box, CssBaseline } from '@material-ui/core';
import { createMuiTheme, ThemeProvider, responsiveFontSizes, makeStyles } from '@material-ui/core/styles';
import SmartMeteoWrapper from '../SmartMeteo/SmartMeteoWrapper';

let theme;
// let theme = createMuiTheme();

theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Quicksand',
      'Roboto'
    ].join(','),
  },
});


theme = responsiveFontSizes(theme);


const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
    },
    [theme.breakpoints.up('md')]: {
      marginTop: 16 * 3,
    }
  }
}));


function AppRoot() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
      <CssBaseline />

        {/* // Wrap all application (for background usage later) */}
        <Container maxWidth={false}>
          {/* Wrap all app content */}
          <Box className={classes.root}>
            <Container component="main" maxWidth="md">
              <SmartMeteoWrapper />
            </Container>
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default AppRoot;