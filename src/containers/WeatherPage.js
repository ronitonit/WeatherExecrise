import React, { Component } from 'react';
import logo from '../logo.svg';
import {connect} from 'react-redux';

class WeatherPage extends Component {
  render() {
    return (
      <div>
           <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
     
      </header>
          <p>i m weather app</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    allData: state.allData,
    weatherData: state.allData.weatherData
  });

export default connect (mapStateToProps, {})(WeatherPage);