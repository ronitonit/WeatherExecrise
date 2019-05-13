import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';

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
        render(){
    const { classes } = this.props;
    debugger;
    let currInitialCard = this.props.currInitialCard;
    let currKey = this.props.place;

    console.log(this.props.data);
    return (
        <Grid item xs={12} sm={4} className={(currKey === currInitialCard || ( currKey > currInitialCard && currKey <= currInitialCard+2) ) ? 'shown' : 'hidden'}>
        <Paper className={classes.paper}>
        <span>Temp : </span> 
        <span>{this.props.tempUnit === 'Celcius' ? Math.trunc(this.props.data.main.temp - 273.15)  :  Math.trunc(this.props.data.main.temp * 9/5 - 459.67) } </span>
        <br/>
        <p><small>{this.props.data.dt_txt}</small></p>
       
        
        </Paper>
        </Grid>
    );}
};

const mapStateToProps = state => ({
    tempUnit : state.allData.tempUnit
  });

export default connect (mapStateToProps, {})(withStyles(styles)(SingleWeatherDayCard));