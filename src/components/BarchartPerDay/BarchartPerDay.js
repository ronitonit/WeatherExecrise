import React, { Component } from "react";
import { connect } from "react-redux";
import "../BarchartPerDay/style.css";
import {
  filterFromArray,
  getSelectedDate,
  getMaxAndMinfromArray
} from "../../utils/helperFunctions";

const mapStateToProps = state => ({
  cardSelected: state.allData.cardSelected,
  cardSelectedDate: state.allData.cardSelectedDate,
  weatherList: state.allData.weatherData.list,
  tempUnit: state.allData.tempUnit
});

class BarchartPerDay extends Component {
  render() {
    // get state for date
    let DateSelected = getSelectedDate(
      this.props.cardSelectedDate,
      this.props.weatherList
    );

    // get only info matching the date
    let infoForSelectedDate = filterFromArray(
      this.props.weatherList,
      DateSelected
    );

    //get higest temperature for that day so we can make our graph better
    let maxVal = getMaxAndMinfromArray(infoForSelectedDate);
    let maxValInDegree = maxVal[0] - 273.15;

    // on all weather list, if the entry matches the date then show it as a bar
    return (
      <div className="barchart">
        {infoForSelectedDate.map((item, index) => (
          <div className="singleBar">
            <div
              className="filler"
              style={{
                height: ((item.main.temp - 273.15) / maxValInDegree) * 100 + "%"
              }}
            >
              <p className="barDegree">
                {this.props.tempUnit === "Celcius"
                  ? Math.trunc(item.main.temp - 273.15)
                  : Math.trunc((item.main.temp * 9) / 5 - 459.67)}{" "}
                <small className="degreeSymbol">o </small>{" "}
              </p>
            </div>
            <span>
              {item.dt_txt.substr(item.dt_txt.indexOf(" ") + 1).slice(0, -3)}
            </span>
            <img
              src={
                "http://openweathermap.org/img/w/" +
                item.weather[0].icon +
                ".png"
              }
              alt="weather description icon"
            />
          </div>
        ))}
        <h3>{DateSelected}</h3>
      </div>
    );
  }
}

export default connect(mapStateToProps)(BarchartPerDay);
