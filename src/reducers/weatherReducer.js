import {DATA_LOADED, WEATHER_DATA} from '../actions/types';
  
  const initialState = {
   dataLoaded: false,
   weatherData: null
  }

  export default function (state = initialState, action) {
    switch (action.type) {
    case  DATA_LOADED:
      return {
        ...state,
        dataLoaded: action.payload
      }
    case  WEATHER_DATA: {
      return {
        ...state,
        weatherData : action.payload
      }
    }
    
    default:
      return state
    }
  }