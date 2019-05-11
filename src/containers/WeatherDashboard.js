import React, { Component } from 'react';
import {connect} from 'react-redux';
import CityInformation from '../components/CityInformation';
import TempUnits from '../components/TempUnits';
import Slider from '../components/Slider';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';


class WeatherDashbobard extends Component {
  
  render() {
    return (
      <div className="mainContainer">
      <Grid container spacing={16}>
        <Grid item xs={12} sm={12}>
        <CityInformation data ={this.props.city}></CityInformation>
        </Grid>
        <Grid item xs={12} sm={12}>
        <TempUnits data ={this.props.city}></TempUnits>
        </Grid>
        <Grid item xs={12} sm={12}>
        <Slider data ={this.props.city}></Slider>
        </Grid>
      </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    city: state.allData.weatherData.city,
    weatherList: state.allData.weatherData.list,
  });


  export default connect (mapStateToProps, {})(WeatherDashbobard);

