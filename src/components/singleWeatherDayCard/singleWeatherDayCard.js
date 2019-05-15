import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {changecardSelected} from '../../actions/weatherActions';
import '../singleWeatherDayCard/style.css';
import {getDegreeBasedonPreference, filterFromArray, getSelectedDate, getMaxAndMinfromArray} from '../../utils/helperFunctions';

const mapStateToProps = state => ({
    tempUnit : state.allData.tempUnit,
    cardSelected: state.allData.cardSelected,
    cardSelectedDate: state.allData.cardSelectedDate,
    weatherList: state.allData.weatherData.list,
  });

const styles = theme => ({
    root: {
      flexGrow: 1,
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  });
  
    class SingleWeatherDayCard extends Component {

    DailyWeatherCardclicked(currKey, date){
        console.log('DailyWeatherCardclicked');
        this.props.changecardSelected(currKey, date);
    }

    render(){
        const { classes } = this.props;
        let currInitialCard = this.props.currInitialCard;
        let currKey = this.props.place;
        debugger;
        let infoForSelectedDate = filterFromArray(this.props.weatherList, this.props.data[0]);
        let MaxMinVal = getMaxAndMinfromArray(infoForSelectedDate);
        debugger;
        return (

            // on click weather card dispatch card's date
            
            <Grid item xs={12}  sm={4}  onClick={() => this.DailyWeatherCardclicked(currKey, this.props.data[0])}
            className={(currKey === currInitialCard || ( currKey > currInitialCard && currKey <= currInitialCard+2) ) ? 'CardShown' : 'CardHidden'
            }>
            <div  className={currKey === this.props.cardSelected ? 'activeCard' : 'normalCards'
            }>
            <Paper className={classes.paper}>
            <div className="mainInfo">
           
            <h2>{ getDegreeBasedonPreference(this.props.tempUnit, this.props.data[1]) } </h2>
            <small className="degreeSymbol">o </small> 
            <p><small>{this.props.data[0]}</small></p>
            </div>
            <div className="additionalInfo">
            <ul>
              <li>
                <span className="lists">
                {getDegreeBasedonPreference(this.props.tempUnit, MaxMinVal[0]) } max - {getDegreeBasedonPreference(this.props.tempUnit, MaxMinVal[1])} min
                </span>
                </li>
              <li><span className="lists">Clouds - {Math.trunc(this.props.data[4])}</span></li>
              <li><span className="lists">Wind Speed - {Math.trunc(this.props.data[5])}</span></li>
            </ul>
            </div>
            </Paper>
            </div>
            </Grid>
            
        );}
};

export default connect (mapStateToProps, {changecardSelected})(withStyles(styles)(SingleWeatherDayCard));