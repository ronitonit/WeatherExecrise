import {
  WEATHER_DATA,
  WEATHER_DATA_NOT_POSSIBLE,
  TEMP_UNIT_CHANGE,
  CHANGE_SELECTED_CARD
} from "./types";

// Get initial data from API before app starts
export function getUserInitialWeatherData() {
  return function(dispatch) {
    fetch(
      "http://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=100"
    )
      .then(response => response.json())
      .then(data =>
        dispatch({
          type: WEATHER_DATA,
          payload: data
        })
      )
      .catch(error => {
        dispatch({
          type: WEATHER_DATA_NOT_POSSIBLE,
          payload: error
        });
        //   throw new Error(error);
      });
  };
}

// change between Celcius & Fahrenheit
export function changeTempUnitOnChange(unit) {
  return function(dispatch) {
    dispatch({
      type: TEMP_UNIT_CHANGE,
      payload: unit
    });
  };
}

// change the state of the selected card key and date
export function changecardSelected(key, date) {
  return function(dispatch) {
    dispatch({
      type: CHANGE_SELECTED_CARD,
      payload: [key, date]
    });
  };
}
