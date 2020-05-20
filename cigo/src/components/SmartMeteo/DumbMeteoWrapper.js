import React from 'react';
import { Box, TextField, Typography, Fab, Hidden, InputAdornment } from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

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
                    <MeteoChart
                        chartData={props.chartData}
                    />
                </Box>
                <Hidden mdUp>
                    <Fab color="primary" aria-label="search" className={classes.fab} onClick={props.fabHandleClick}>
                        <SearchIcon />
                    </Fab>
                </Hidden>
            </Box>
        </React.Fragment>
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

function MeteoText(props) {
    return (
        <Typography variant="h1" component="h1" gutterBottom>
            {props.text}
        </Typography>
    );
}

function MeteoChart(props) {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <LineChart
                height={200}
                width={500}
                data={props.chartData}
            >
                <Line type="monotone" dataKey="niveauPluie" stroke="#8884d8" isAnimationActive={false}/>
                <XAxis dataKey="hours" />
                <YAxis tickMargin={25} />
                <CartesianGrid stroke="#ccc" />
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default DumbMeteoWrapper; 