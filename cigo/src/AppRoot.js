import React from 'react';
import { Container, Box, TextField, Typography, Fab, Hidden } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import { createMuiTheme, ThemeProvider, responsiveFontSizes, makeStyles } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles({
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  }
});


function AppRoot() {
  return (
    <ThemeProvider theme={theme}>

      {/* // Wrap all application (for background usage later) */}
      <Container maxWidth={false}>
        {/* Wrap all app content */}
        <Box my={6}>
          <Container component="main" maxWidth="md">
            <SmartMeteoWrapper />
          </Container>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

/**
 * Orchestrate State for application
 */
function SmartMeteoWrapper(props) {
  const classes = useStyles();

  let cityList = [
    "Rennes",
    "Poitiers",
    "Paris"
  ]


  return (
    <React.Fragment>
      <Box display="flex" flexDirection="column">
        <Box my={1}>
          <SearchAutocomplete list={cityList} label="Ville" />
        </Box>
        <Box my={1}>
          <MeteoText text="Pluie faible dans 15 minutes." />
        </Box>
        <Box my={1}>
          <div style={{ padding: '50px', backgroundColor: 'aqua' }}></div>
        </Box>
        <Hidden mdUp>
          <Fab color="primary" aria-label="search" className={classes.fab}>
            <SearchIcon />
          </Fab>
        </Hidden>
      </Box>
    </React.Fragment>
  )
}



function MeteoText(props) {
  return (
    <Typography variant="h1" component="h1" gutterBottom>
      {props.text}
    </Typography>
  );
}

function SearchAutocomplete(props) {
  return (
    <Autocomplete
      options={props.list}
      fullWidth={true}
      disableClearable
      freeSolo
      renderInput={(params) => <TextField {...params} label={props.label} variant="outlined" InputProps={{ ...params.InputProps, type: 'search' }} />}
    />
  );
}


export default AppRoot;