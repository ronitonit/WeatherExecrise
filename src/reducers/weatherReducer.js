import {
  WEATHER_DATA,
  WEATHER_DATA_NOT_POSSIBLE,
  TEMP_UNIT_CHANGE,
  CHANGE_SELECTED_CARD
} from "../actions/types";

const initialState = {
  weatherDataLoaded: false,
  weatherData: null,
  error: null,
  tempUnit: "Celcius",
  cardSelected: 0,
  cardSelectedDate: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case WEATHER_DATA_NOT_POSSIBLE:
      return {
        ...state,
        error: action.payload.message
      };
    case WEATHER_DATA: {
      return {
        ...state,
        weatherDataLoaded: true,
        weatherData: action.payload
      };
    }
    case TEMP_UNIT_CHANGE: {
      return {
        ...state,
        tempUnit: action.payload
      };
    }
    case CHANGE_SELECTED_CARD: {
      return {
        ...state,
        cardSelected: action.payload[0],
        cardSelectedDate: action.payload[1]
      };
    }

    default:
      return state;
  }
}
