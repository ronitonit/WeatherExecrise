// returns Selected date that is stored in state if provided else takes the first date in list
export function getSelectedDate(selectedDateFromState, weatherList) {
  debugger;
  let DateSelected;
  if (selectedDateFromState === null) {
    let dateTimeCombined = weatherList[0].dt_txt;
    DateSelected = dateTimeCombined.substr(0, dateTimeCombined.indexOf(" "));
  } else {
    DateSelected = selectedDateFromState;
  }
  return DateSelected;
}

// Returns maximum and minimum temperature from an array.
export function getMaxAndMinfromArray(array) {
  let Max = Math.max.apply(
    Math,
    array.map(function(item) {
      return item.main.temp;
    })
  );

  let Min = Math.min.apply(
    Math,
    array.map(function(item) {
      return item.main.temp;
    })
  );

  return [Max, Min];
}

// Based on the preference, return thhe degree
export function getDegreeBasedonPreference(preference, DegreeInKelvinUnit) {
  return preference === "Celcius"
    ? Math.trunc(DegreeInKelvinUnit - 273.15)
    : Math.trunc((DegreeInKelvinUnit * 9) / 5 - 459.67);
}

// filters items from Weather list array that matches the specified date
export function filterFromArray(mainArray, dateToCompare) {
  let infoForSelectedDate = mainArray.filter((item, index) => {
    let dateAndTime = item.dt_txt;
    let dateOnly = dateAndTime.substr(0, dateAndTime.indexOf(" "));

    //if the date in each loop matches then add all the temps and cloud etc.
    if (dateToCompare === dateOnly) {
      return true;
    }
  });

  return infoForSelectedDate;
}

// Get details for a day from the weather list
// details include,
export function getAverageForDiffValuesForDay(weatherList) {
  let counter = 0;
  let tempVal = [0, 0, 0, 0, 0];
  let DayDetails = [];
  let firstDayAndTime = weatherList[0].dt_txt;
  let firstDay = firstDayAndTime.substr(0, firstDayAndTime.indexOf(" "));
  weatherList.map((item, index) => {
    let dateAndTime = item.dt_txt;
    let dateOnly = dateAndTime.substr(0, dateAndTime.indexOf(" "));

    //if the date in each loop matches then add all the temps and cloud etc.
    if (firstDay === dateOnly) {
      tempVal = [
        tempVal[0] + item.main.temp,
        tempVal[1] + item.main.temp_min,
        tempVal[2] + item.main.temp_max,
        tempVal[3] + item.clouds.all,
        tempVal[4] + item.wind.speed
      ];
      counter = counter + 1;
    } else {
      // when the date no longer matches,
      // then add the firstday details divided by counter to get average
      tempVal = [
        firstDay,
        tempVal[0] / counter,
        tempVal[1] / counter,
        tempVal[2] / counter,
        tempVal[3] / counter,
        tempVal[4] / counter
      ];
      DayDetails.push(tempVal);

      // setting value to 0 for next day that is already in the loop
      tempVal = [0, 0, 0, 0, 0];
      tempVal = [
        tempVal[0] + item.main.temp,
        tempVal[1] + item.main.temp_min,
        tempVal[2] + item.main.temp_max,
        tempVal[3] + item.clouds.all,
        tempVal[4] + item.wind.speed
      ];
      counter = 1;
      firstDay = dateOnly;
    }
  });
  // add the value of the last day to the array.
  tempVal = [
    firstDay,
    tempVal[0] / counter,
    tempVal[1] / counter,
    tempVal[2] / counter,
    tempVal[3] / counter,
    tempVal[4] / counter
  ];
  DayDetails.push(tempVal);

  return DayDetails;
}

export function getTodaysDate() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  month = month + 1;
  if (month.toString().length < 2) {
    month = "0" + month;
  }
  let day = date.getDate();
  let dayInWeek = date.getDay();
  let dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let todayDayName = dayNames[dayInWeek];
  let fullDate = year + "-" + month + "-" + day;

  return [fullDate, todayDayName];
}
