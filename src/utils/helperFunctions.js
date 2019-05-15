export function getSelectedDate(selectedDateFromState, weatherList){
    debugger;
    let DateSelected;
    if( selectedDateFromState === null){
        let dateTimeCombined = weatherList[0].dt_txt;
        DateSelected = dateTimeCombined.substr(0,dateTimeCombined.indexOf(' '));
    }
    else{
        DateSelected = selectedDateFromState;
    }
    return DateSelected;
}

export function getMaxAndMinfromArray(array){
    let Max = Math.max.apply(Math,array.map(function(item){
        return item.main.temp;
    }))

    let Min = Math.min.apply(Math,array.map(function(item){
        return item.main.temp;
    }))

    return [Max,Min];

}

export function getDegreeBasedonPreference(preference, DegreeInKelvinUnit){
    return preference === 'Celcius' ? Math.trunc(DegreeInKelvinUnit - 273.15)  :  Math.trunc(DegreeInKelvinUnit * 9/5 - 459.67)
    }
    
 export function filterFromArray(mainArray, dateToCompare){
        let infoForSelectedDate = mainArray.filter((item, index) => {
            let dateAndTime = item.dt_txt;
            let dateOnly = dateAndTime.substr(0,dateAndTime.indexOf(' '));
        
                //if the date in each loop matches then add all the temps and cloud etc.
                if(dateToCompare === dateOnly){
                  return true;
                }
            });
    
            return infoForSelectedDate;
    }