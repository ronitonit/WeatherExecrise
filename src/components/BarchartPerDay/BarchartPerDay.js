import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../BarchartPerDay/style.css';

const mapStateToProps = state => ({
    cardSelected: state.allData.cardSelected,
    cardSelectedDate: state.allData.cardSelectedDate,
    weatherList: state.allData.weatherData.list,
    tempUnit : state.allData.tempUnit
})

class BarchartPerDay extends Component {


    render() {
        // get state for date 
        let DateSelected;
        if( this.props.cardSelectedDate === null){
            debugger;   
            let dateTimeCombined = this.props.weatherList[0].dt_txt;
            DateSelected = dateTimeCombined.substr(0,dateTimeCombined.indexOf(' '));
        }
        else{
            DateSelected = this.props.cardSelectedDate;
        }

        let infoForSelectedDate = this.props.weatherList.filter((item, index) => {
            let dateAndTime = item.dt_txt;
            let dateOnly = dateAndTime.substr(0,dateAndTime.indexOf(' '));
        
                //if the date in each loop matches then add all the temps and cloud etc.
                if(DateSelected === dateOnly){
                  return true;

                }
                else{
                 
                }
            });
debugger;
            console.log(infoForSelectedDate)

        // on all weather list, if the entry matches the date then show it as a bar

        return (
            <div className="barchart">
            {infoForSelectedDate.map((item, index) => (
                 <div className="singleBar">
                 {/* <p>{item.main.temp}</p> */}
                 <p className="barDegree">{this.props.tempUnit === 'Celcius' ? Math.trunc(item.main.temp - 273.15)  :  Math.trunc(item.main.temp * 9/5 - 459.67) } <small className="degreeSymbol">o </small> </p>
                 <div className="filler" style={{height : ((item.main.temp/373.15)*100)+'%'}}></div>
                 <span>{(item.dt_txt).substr((item.dt_txt).indexOf(' ')+1)}</span>
               
             </div>
      ))}
        <h3>{DateSelected}</h3>
      
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(BarchartPerDay);