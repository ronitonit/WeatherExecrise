import store from '../store.js';
import {AUTH_USER, WEATHER_DATA
  } from './types';


  export function getUserInitialWeatherData() {
    return function(dispatch) {
      fetch("")
        .then(response => response.json())
        .then(data => dispatch({
          type: WEATHER_DATA,
          payload: data
        }))
        .catch(error => {
          throw new Error(error);
        })
    }
  }