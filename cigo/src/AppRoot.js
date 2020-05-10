import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Box } from '@material-ui/core';

function AppRoot() {
  return (
    // Wrap all application (for background usage later)
    <Container maxWidth={false}>
      {/* Wrap all app content */}
      <Box my={6}>
        <Container component="main" maxWidth="md">
          <SmartMeteoWrapper/>
        </Container>
      </Box>
    </Container>
  );
}

/**
 * Orchestrate State for application
 */
function SmartMeteoWrapper(props) {

  let cityList = [
    "Rennes",
    "Poitiers",
    "Paris"
  ]


  return (
    <React.Fragment>
      <Box display="flex" flexDirection="column">

      <SearchAutocomplete list={cityList} label="Ville" />

      {/* Texte De Pluie Dynamique
      Graphe de Pluie
      Floating Actiono Button */}

      </Box>

    </React.Fragment>
  )
}

function SearchAutocomplete(props) {
  return (
    <Autocomplete 
    options={props.list}
    fullWidth={true}
    disableClearable
    renderInput={(params) => <TextField {...params} label={props.label} variant="outlined" InputProps={{ ...params.InputProps, type: 'search' }}/>}
    />
  );
}


export default AppRoot;