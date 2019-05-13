import React, { Component } from 'react';
import {connect} from 'react-redux';
import CityInformation from '../components/CityInformation';
import TempUnits from '../components/TempUnits';
import Slider from '../components/Slider';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  TempUnits :{
    width : '100%'
  }
});

class WeatherDashbobard extends Component {
  
  render() {
    const { classes } = this.props;
    return (
      <div className="mainContainer">
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <CityInformation city ={this.props.city} weather={this.props.weather}></CityInformation>
                <Paper className={classes.paper}><TempUnits></TempUnits></Paper>
              </Paper>
              </Grid>
              <Grid item xs={12}>
              <Paper className={classes.paper}><Slider data ={this.props.weatherList}></Slider></Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    city: state.allData.weatherData.city,
    weather: state.allData.weatherData.list[0].weather[0],
    weatherList: state.allData.weatherData.list,
  });


  export default connect (mapStateToProps, {})(withStyles(styles)(WeatherDashbobard));

