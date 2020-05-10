import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Box, TextField, Typography, Fab, Hidden } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';

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

  const defaultCity = "Rennes";
  let defaultCityList = [
    "Rennes",
    "Poitiers",
    "Paris"
  ];

  const [currentCity, setCurrentCity] = useState(defaultCity);
  const [cityList, setCityList] = useState(defaultCityList);

  // let cityList = defaultCityList;

  useEffect(() => {
    document.title = `${currentCity}`;
    console.log(currentCity);

    //Call API for the current city
    if (currentCity.length === 2 || currentCity === defaultCity ) {
      cityListUpdate();
    }
    // cityFetch.then((res)=>{
    //   console.log(res);
    // });

    //MAJ City List
    //MAJ Text
    //MAJ Graph 
  }, [currentCity]);


  function searchHandleChange(event, value) {
    // if(currentCity !== value){
    setCurrentCity(value);
    // }
  }

  async function cityListUpdate(){
    let fetchResult = await cityFetch();
    let jsonResult = await fetchResult.json();
    let slugList = jsonResult.map(el => el.slug);

    console.log(jsonResult);
    console.log(slugList);
    setCityList(slugList);

    
    // let res2 = res.map(el => (
    //   {
    //     slug:el.slug,
    //     postal:el.codePostal,
    //     insee:el.id
    //   })
    // );
  }

  function cityFetch() {
    const API_URL = `${process.env.API_HOST || ""}/mf3-rpc-portlet/rest/lieu/facet/pluie/search`;

    let citySearch = currentCity;
    console.log("citySearch");
    console.log(citySearch);
    
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
    limit:25,
    ignoreCase: true,
    ignoreAccents: true,
  });


  return (
    <Autocomplete
      defaultValue={props.defaultValue}
      inputValue={props.inputValue}
      onInputChange={props.handleChange}
      options={props.list}
      fullWidth={true}
      disableClearable
      freeSolo
      filterOptions={filterOptions}
      renderInput={(params) => <TextField {...params} label={props.label} variant="outlined" InputProps={{ ...params.InputProps, type: 'search' }} />}
    />
  );
}


export default AppRoot;