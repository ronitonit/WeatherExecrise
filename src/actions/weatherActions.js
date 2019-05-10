import {WEATHER_DATA, WEATHER_DATA_NOT_POSSIBLE
  } from './types';

  export function getUserInitialWeatherData() {
    return function(dispatch) {
      fetch("http://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=7")
        .then(response => response.json())
        .then(data => dispatch({
          type: WEATHER_DATA,
          payload: data
        })
        )
        .catch(error => {
            dispatch({
                type: WEATHER_DATA_NOT_POSSIBLE,
                payload: error
              })
        //   throw new Error(error);
        })
    }
  }