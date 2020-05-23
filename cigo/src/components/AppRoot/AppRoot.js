import React from 'react';
import { Container, Box} from '@material-ui/core';
import { createMuiTheme, ThemeProvider, responsiveFontSizes, makeStyles } from '@material-ui/core/styles';
import  SmartMeteoWrapper from '../SmartMeteo/SmartMeteoWrapper';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
    },
    [theme.breakpoints.up('md')]: {
      marginTop: 16*3,
    }
  }
}));


function AppRoot() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>

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
  );
}

export default AppRoot;