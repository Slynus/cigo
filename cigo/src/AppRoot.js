import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Box, TextField, Typography, Fab, Hidden, InputAdornment } from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
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

  // const defaultCity = "Rennes";

  // let defaultCityList = [
  //   "Rennes",
  //   "Poitiers",
  //   "Paris"
  // ];

  let defaultCityList = [
    {
      label:"Rennes",
      id:352380
    },
    {
      label:"Poitiers",
      id:861940
    },
    {
      label:"Paris",
      id:751010
    }
  ];

  const defaultCity = {
    label:"Rennes",
    id:352380
  }



  const [currentCity, setCurrentCity] = useState(defaultCity);
  const [cityList, setCityList] = useState(defaultCityList);

  // let cityList = defaultCityList;

  useEffect(() => {
    document.title = `${currentCity}`;

    // if (currentCity.length === 2 || currentCity === defaultCity) {
      cityListUpdate(currentCity);
    // }

    //MAJ Text
    //MAJ Graph 


    async function cityListUpdate(citySearch) {
      const fetchResult = await cityFetch(citySearch);
      const jsonResult = await fetchResult.json();


      const slugList = jsonResult.map(el => el.slug);


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


      console.log(jsonTransformed);
      setCityList(jsonTransformed);
    }

  }, [currentCity]);



  function searchHandleChange(event, value) {
    const newCity = {
      label:value
    }

    // TO DO HERE (check include ?) ( et apres if id déclenchement call API pluie et if pas d'id change style) dans le useEffect? 
    setCurrentCity(newCity);
  }


  function cityFetch(citySearch) {
    const API_URL = `${process.env.API_HOST || ""}/mf3-rpc-portlet/rest/lieu/facet/pluie/search`;
    return fetch(`${API_URL}/${citySearch}`);
  }

  return (
    <DumbMeteoWrapper
      searchDefaultValue={defaultCity}
      searchInputValue={currentCity}
      searchCityList={cityList}
      searchHandleChange={searchHandleChange}
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

  let testIcon = <SearchIcon fontSize="small" />;
  return (
    <Autocomplete
    defaultValue={props.defaultValue}
    // inputValue={props.inputValue}
    // defaultValue={props.defaultValue.label}
    // inputValue={props.inputValue.label}
    getOptionLabel={opt=>opt.label}
    options={props.list}

      onInputChange={props.handleChange}
      selectOnFocus
      handleHomeEndKeys
      debug
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