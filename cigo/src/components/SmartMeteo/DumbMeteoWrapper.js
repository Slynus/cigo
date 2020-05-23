import React from 'react';
import { Box, TextField, Typography, Fab, Hidden, InputAdornment, Card, CardContent, Paper } from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const useStyles = makeStyles({
    fab: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    },
    paper: {
        padding: 15
    }
});

function DumbMeteoWrapper(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Box display="flex" flexDirection="column">
                <Box my={1}>
                    <Paper className={classes.paper} elevation={3}>
                        <SearchAutocomplete
                            list={props.searchCityList}
                            defaultValue={props.searchDefaultValue}
                            inputValue={props.searchInputValue}
                            handleChange={props.searchHandleChange}
                            label="Ville" />
                    </Paper>
                </Box>
                <Box my={1}>
                    <Paper className={classes.paper} elevation={3}>
                        <MeteoText
                            rainLevel={props.rainLevel}
                            timeBeforeRain={props.timeBeforeRain}
                        />
                    </Paper>
                </Box>
                <Box my={1}>
                    <Paper className={classes.paper} elevation={3}>
                        <MeteoChart
                            chartData={props.chartData}
                        />
                    </Paper>
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

    let renderText;

    if (props.rainLevel > 0) {

        let rainLevelText;
        switch (props.rainLevel) {
            case 1:
                rainLevelText = "faible"
                break;
            case 2:
                rainLevelText = "modérée"
                break;
            case 3:
                rainLevelText = "forte"
                break;
            default:
                rainLevelText = "torrentielle"
                break;
        }
        renderText = `Attention pluie ${rainLevelText} prévue dans ${props.timeBeforeRain} minutes ! 🌧️`;
    } else {
        renderText = "Vous pouvez sortir sans risque ! 😎";
    }

    const shouldRender = props.rainLevel > -1;

    if (shouldRender) {
        return (
            < Typography variant="h2" component="h1" gutterBottom >
                {renderText}
            </Typography >
        );
    } else {
        return null;
    }

}

function MeteoChart(props) {

    const RenderCustomAxisTick = ({ x, y, payload }) => {
        let renderText;

        switch (payload.value) {
            case 0:
                renderText = "Pas de Pluie"

                break;
            case 1:
                renderText = "Faible"

                break;
            case 2:
                renderText = "Modérée"

                break;
            case 3:
                renderText = "Forte"
                break;
            default:
                renderText = "Pas d'info";
        }

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={0} textAnchor="end" fill="#666" >{renderText}</text>
            </g>
        );
    };

    const myTicks = [0, 1, 2, 3];

    const RenderCustomTooltip = (props) => {
        let renderText;

        if (props && props.payload && props.payload.length) {
            const realPayload = props?.payload[0].payload;
            switch (realPayload.niveauPluie) {
                case 0:
                    renderText = `Pas de pluie prévue.`;
                    break;
                case 1:
                    renderText = `Pluie faible prévue.`;
                    break;
                case 2:
                    renderText = `Pluie modérée prévue.`;
                    break;
                case 3:
                    renderText = `Pluie forte prévue.`;
                    break;
                default:
                    renderText = `Pluie torrentielle prévue.`;
                    break;
            }
        }

        return (
            <Card >
                <CardContent>
                    <Typography variant="body1">
                        {renderText}
                    </Typography>
                </CardContent>
            </Card>
        );
    };

    return (
        <ResponsiveContainer width="100%" height={200}>
            <AreaChart
                height={200}
                width={500}
                data={props.chartData}
            >
                <Area type="monotone" dataKey="niveauPluie" stroke="#3f51b5" fill="#3f51b5" isAnimationActive={true} />
                <XAxis dataKey="hours" />
                <YAxis width={90} tickMargin={5} ticks={myTicks} tick={<RenderCustomAxisTick />} />
                <Tooltip content={<RenderCustomTooltip />} />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default DumbMeteoWrapper; 