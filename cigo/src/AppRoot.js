import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Box, TextField, Typography, Fab, Hidden, InputAdornment } from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
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

  const defaultCity = {
    label: "Rennes",
    id: 352380
  }

  const texteSansPluie = "Vous pouvez sortir sans risque ! 😎";
  const texteAvecPluie = "Attention pluie prévue ! 🌧️";

  const [currentCity, setCurrentCity] = useState(defaultCity);
  const [displayedCity, setDisplayedCity] = useState(currentCity);
  const [cityList, setCityList] = useState([]);

  const [meteoText, setMeteoText] = useState("");

  useEffect(() => {
    console.log("Use Effect ! Search");

    if (currentCity.label.length === 2 || currentCity.label === defaultCity.label) {
      cityListUpdate(currentCity.label);
    }

    async function cityListUpdate(citySearch) {
      const fetchResult = await cityFetch(citySearch);
      const jsonResult = await fetchResult.json();

      const jsonTransformed = jsonResult.map(el => {
        let label = el.nomAffiche.split(' ');
        if (label.length > 1) {
          label.pop()
          label = label.join(' ');
        };
        return {
          label: label,
          id: el.id
        }
      });

      setCityList(jsonTransformed);
    }

  }, [currentCity, defaultCity.label]);

  useEffect(() => {
    console.log("Use Effect ! Meteo");
    document.title = `${displayedCity.label}`;

    meteoUpdate(displayedCity.id);

    async function meteoUpdate(cityId) {
      const fetchResult = await meteoFetch(cityId);
      const jsonResult = await fetchResult.json();

      const levelPluie = jsonResult.dataCadran.map(el => el.niveauPluie);

      // majMeteooText()
      // majGraph()

      if (levelPluie[0] > 1) {
        setMeteoText(texteAvecPluie);
      } else {
        setMeteoText(texteSansPluie);
      }
    }

  }, [displayedCity, meteoText]);


  function searchHandleChange(event, value) {
    const foundCity = cityList.find(el => el.label.toLowerCase() === value.toLowerCase());

    if (foundCity) {
      setCurrentCity(foundCity);
      setDisplayedCity(foundCity);
    } else {
      const newCity = {
        label: value
      }
      setCurrentCity(newCity);
    }
  }

  function cityFetch(citySearch) {
    const API_URL = `${process.env.API_HOST || ""}/mf3-rpc-portlet/rest/lieu/facet/pluie/search`;
    return fetch(`${API_URL}/${citySearch}`);
  }

  function meteoFetch(cityId) {
    const API_URL = `${process.env.API_HOST || ""}/mf3-rpc-portlet/rest/pluie`;
    return fetch(`${API_URL}/${cityId}`);
  }

  return (
    <DumbMeteoWrapper
      searchDefaultValue={defaultCity}
      searchInputValue={currentCity}
      searchCityList={cityList}
      searchHandleChange={searchHandleChange}
      meteoText={meteoText}
    />
  );
}

function DumbMeteoWrapper(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Box display="flex" flexDirection="column">
        <Box my={1}>
          <SearchAutocomplete
            list={props.searchCityList}
            defaultValue={props.searchDefaultValue}
            inputValue={props.searchInputValue}
            handleChange={props.searchHandleChange}
            label="Ville" />
        </Box>
        <Box my={1}>
          <MeteoText text={props.meteoText} />
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
  );
}

function MeteoText(props) {
  return (
    <Typography variant="h1" component="h1" gutterBottom>
      {props.text}
    </Typography>
  );
}

function SearchAutocomplete(props) {

  const filterOptions = createFilterOptions({
    limit: 25,
    ignoreCase: true,
    ignoreAccents: true,
  });

  return (
    <Autocomplete
      defaultValue={props.defaultValue.label}
      // inputValue={props.inputValue}
      // defaultValue={props.defaultValue.label}
      // inputValue={props.inputValue.label}

      // getOptionLabel={opt => opt.label}
      options={props.list.map(el => el.label)}

      onInputChange={props.handleChange}
      selectOnFocus
      handleHomeEndKeys

      freeSolo
      filterOptions={filterOptions}
      renderInput={(params) =>
        <TextField {...params} label={props.label} variant="outlined"
          InputProps={{
            ...params.InputProps, startAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            )
          }} />}
    />
  );
}


export default AppRoot;