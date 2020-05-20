import React from 'react';
import { useState, useEffect,useCallback } from 'react';
import DumbMeteoWrapper from '../SmartMeteo/DumbMeteoWrapper';
import log from '../../utils/logger';

const chartDataDefault = [
  {
    hours: "15:00",
    niveauPluie: 1,
    niveauPluieText: "Pas de précipitations"
  },
  {
    hours: "15:05",
    niveauPluie: 2,
    niveauPluieText: "Précipitations faibles"
  },
  {
    hours: "15:10",
    niveauPluie: 3,
    niveauPluieText: "Précipitations modérées"
  },
  {
    hours: "15:15",
    niveauPluie: 3,
    niveauPluieText: "Précipitations modérées"
  },
  {
    hours: "15:20",
    niveauPluie: 2,
    niveauPluieText: "Précipitations faibles"
  },
  {
    hours: "15:25",
    niveauPluie: 4,
    niveauPluieText: "Pas de précipitations"
  },
  {
    hours: "15:30",
    niveauPluie: null,
    niveauPluieText: "Pas de précipitations"
  },
  {
    hours: "15:35",
    niveauPluie: 1,
    niveauPluieText: "Pas de précipitations"
  },
  {
    hours: "15:40",
    niveauPluie: 4,
    niveauPluieText: "Précipitations fortes"
  },
  {
    hours: "15:45",
    niveauPluie: 1,
    niveauPluieText: "Pas de précipitations"
  },
  {
    hours: "15:50",
    niveauPluie: 0,
    niveauPluieText: "Données indisponibles"
  },
  {
    hours: "15:55",
    niveauPluie: 1,
    niveauPluieText: "Pas de précipitations"
  }
];

const chartDataDefaultV2 = [
  {
    hours: "15:00",
    niveauPluie: 1,
    niveauPluieText: "Pas de précipitations"
  },
  {
    hours: "15:05",
    niveauPluie: 1,
    niveauPluieText: "Pas de précipitations"
  },
  {
    hours: "15:10",
    niveauPluie: 1,
    niveauPluieText: "Pas de précipitations"
  },
  {
    hours: "15:15",
    niveauPluie: 1,
    niveauPluieText: "Pas de précipitations"
  },
  {
    hours: "15:20",
    niveauPluie: 1,
    niveauPluieText: "Pas de précipitations"
  },
  {
    hours: "15:25",
    niveauPluie: 1,
    niveauPluieText: "Pas de précipitations"
  },
  {
    hours: "15:30",
    niveauPluie: null,
    niveauPluieText: "Pas de précipitations"
  },
  {
    hours: "15:35",
    niveauPluie: 1,
    niveauPluieText: "Pas de précipitations"
  },
  {
    hours: "15:40",
    niveauPluie: 4,
    niveauPluieText: "Précipitations fortes"
  },
  {
    hours: "15:45",
    niveauPluie: 1,
    niveauPluieText: "Pas de précipitations"
  },
  {
    hours: "15:50",
    niveauPluie: 0,
    niveauPluieText: "Données indisponibles"
  },
  {
    hours: "15:55",
    niveauPluie: 1,
    niveauPluieText: "Pas de précipitations"
  }

];

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

  const [meteoText, setMeteoText] = useState();
  const [chartData, setChartData] = useState(chartDataDefault);


  /** 
   * Trigger when the search is updated
  */
  useEffect(() => {
    if (currentCity.label.length === 2 || currentCity.label === defaultCity.label) {
      cityListUpdate(currentCity.label);
    }

    async function cityListUpdate(citySearch) {
      try {
        const fetchResult = await cityFetch(citySearch);
        setCityList(fetchResult);

      } catch (error) {
        log.error(error);
        // setState on error
      }
    }

  }, [currentCity, defaultCity.label]);

  const meteoUpdate = useCallback(async (cityId)=> {
    try {
      const meteoResult = await meteoFetch(cityId);


      // majMeteooText() //V2
      // majGraph()

      
      if (meteoResult[0][1] > 1) {
        setMeteoText(texteAvecPluie);
      } else {
        setMeteoText(texteSansPluie);
      }

      setChartData(meteoResult[1]);

    } catch (error) {
      log.error(error);
      // setState on error
    }
  },[]);

  /**
   * Triggered when cityDisplayed update and text and graph should update
   */
  useEffect(() => {
    document.title = `${displayedCity.label}`;

    meteoUpdate(displayedCity.id);

  }, [displayedCity,meteoUpdate]);




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

  async function cityFetch(citySearch) {
    const API_URL = `${process.env.REACT_APP_API_HOST}/http://www.meteofrance.com/mf3-rpc-portlet/rest/lieu/facet/pluie/search`;
    const fetchResult = await fetch(`${API_URL}/${citySearch}`);
    if (fetchResult.ok) {
      const jsonResult = await fetchResult.json();
      const jsonTransformed = jsonResult.map(el => {
        // Remove the postal code from city name
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
      return jsonTransformed;
    } else {
      throw new Error("Can't Fetch Search API");
    }
  }

  async function meteoFetch(cityId) {
    const API_URL = `${process.env.REACT_APP_API_HOST}/http://www.meteofrance.com/mf3-rpc-portlet/rest/pluie`;
    const fetchResult = await fetch(`${API_URL}/${cityId}`);
    if (fetchResult.ok) {
      const jsonResult = await fetchResult.json();
      const levelPluie = jsonResult.dataCadran.map(el => el.niveauPluie);
      const jsonTransformed = processJsonForChart(jsonResult);

      return [levelPluie,jsonTransformed];
    } else {
      throw new Error("Can't Fetch Meteo API");
    }

    // Transform the json result from meteo API to a "chartable" one
    function processJsonForChart(json) {

      function getTimePlusMinutes(item, m) {
        return item.getTime() + (m * 60 * 1000);
      }

      const timeStr = json.niveauPluieText[0].split(' ')[0];
      const hourStartStr = timeStr[2] + timeStr[3];
      const minutesStartStr = timeStr[5] + timeStr[6];
      let startDate = new Date();
      startDate.setHours(hourStartStr);
      startDate.setMinutes(minutesStartStr);

      let jsonChart = json.dataCadran;
      jsonChart = jsonChart.map((el,index) => {
        let newEl = {};
        if (el.niveauPluie === 0) {
          newEl.niveauPluie = null;
        } else {
          newEl.niveauPluie = el.niveauPluie - 1
        }

        let startDateCopy = new Date(startDate.getTime());
        startDateCopy.setTime(getTimePlusMinutes(startDate,5*index));

        newEl.hours = `${startDateCopy.getHours()}:${(startDateCopy.getMinutes()<10?'0':'') + startDateCopy.getMinutes()}`;
        return newEl;
      });


      return jsonChart;
    }
  }



  function fabHandleClick() {
    log.debug("é_é");
    setChartData(chartDataDefaultV2);
  }

  return (
    <DumbMeteoWrapper
      searchDefaultValue={defaultCity}
      searchInputValue={currentCity}
      searchCityList={cityList}
      searchHandleChange={searchHandleChange}
      meteoText={meteoText}
      chartData={chartData}
      fabHandleClick={fabHandleClick}
    />
  );
}

export default SmartMeteoWrapper;