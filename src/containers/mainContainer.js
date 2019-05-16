import React, { Component } from 'react';
import logo from '../assets/circles.svg';
import {connect} from 'react-redux';
import {getUserInitialWeatherData} from '../actions/weatherActions';
import WeatherDashbobard from './WeatherDashboard';

class mainContainer extends Component {

    componentDidMount(){
        this.props.getUserInitialWeatherData();
    }
  render() {
    return (
      <div>
           <header className="App-header">
          {!this.props.dataLoaded &&  (this.props.error === null) &&
                <img src={logo} className="App-logo" alt="logo" />
          }
          
          {!this.props.dataLoaded && this.props.error &&
                <div>
                    <h1>:(</h1>
                    <p>{this.props.error}</p>
                    <br/>
                    <b> Please try to refresh or check your internet</b>
                </div>
          }
           
           {this.props.dataLoaded &&
            <WeatherDashbobard/>
          }
          </header>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    dataLoaded : state.allData.weatherDataLoaded,
    error: state.allData.error
  });

export default connect (mapStateToProps, {getUserInitialWeatherData})(mainContainer);