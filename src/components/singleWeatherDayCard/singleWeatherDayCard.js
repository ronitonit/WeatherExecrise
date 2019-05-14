import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {changecardSelected} from '../../actions/weatherActions';
import '../singleWeatherDayCard/style.css';

const mapStateToProps = state => ({
    tempUnit : state.allData.tempUnit
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

        return (

            // on click weather card dispatch card's date
            <Grid item xs={12}  sm={4}  onClick={() => this.DailyWeatherCardclicked(currKey, this.props.data[0])}
            className={(currKey === currInitialCard || ( currKey > currInitialCard && currKey <= currInitialCard+2) ) ? 'CardShown' : 'CardHidden'
            }>
            <Paper className={classes.paper}>
            <h2>{this.props.tempUnit === 'Celcius' ? Math.trunc(this.props.data[1] - 273.15)  :  Math.trunc(this.props.data[1] * 9/5 - 459.67) } </h2> <small className="degreeSymbol">o </small> 
            <br/>
            <p><small>{this.props.data[0]}</small></p>
            </Paper>
            </Grid>
        );}
};

export default connect (mapStateToProps, {changecardSelected})(withStyles(styles)(SingleWeatherDayCard));