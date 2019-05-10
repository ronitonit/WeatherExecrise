import {WEATHER_DATA, WEATHER_DATA_NOT_POSSIBLE} from '../actions/types';
  
  const initialState = {
      weatherDataLoaded: false,
      weatherData: null,
      error:null
  }

  export default function (state = initialState, action) {
    switch (action.type) {
      case WEATHER_DATA_NOT_POSSIBLE:
      return{
        ...state,
        error: action.payload.message
      }
    case  WEATHER_DATA: {
      return {
        ...state,
        weatherDataLoaded : true,
        weatherData : action.payload

      }
    }
    
    default:
      return state
    }
  }