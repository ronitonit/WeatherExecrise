import React, { Component } from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { SkipPrevious, SkipNext } from '@material-ui/icons';
import SingleWeatherDayCard from '../singleWeatherDayCard/singleWeatherDayCard';
import '../Slider/style.css';

const mapStateToProps = state => ({
  city: state.allData.weatherData.city,
  weather: state.allData.weatherData.list[0].weather[0],
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

class Slider extends Component {
    constructor(props){
        super(props);
        this.state = {initialCard :0,
        }
    }

    nextPrevBTNclicked(clickedValue) {
        let val;
        // this.refs.btn.setAttribute("disabled", "disabled");
        if (clickedValue === "next") {
          val = this.state.initialCard + 3;
        } else {
          val = this.state.initialCard - 3;
        }

        this.setState({initialCard : val})
    }
   
    render() {
        const { classes } = this.props;

    // get average temp for each day.
    let counter = 0;
    let tempVal = [0,0,0,0,0]
    let DayDetails= [];
    let firstDayAndTime = (this.props.weatherList[0].dt_txt);
    let firstDay = firstDayAndTime.substr(0,firstDayAndTime.indexOf(' '));
    let DayCards = this.props.weatherList.map((item, index) => {
    let dateAndTime = item.dt_txt;
    let dateOnly = dateAndTime.substr(0,dateAndTime.indexOf(' '));

        //if the date in each loop matches then add all the temps and cloud etc.
        if(firstDay === dateOnly){
            tempVal = [(tempVal[0] + item.main.temp),( tempVal[1] + item.main.temp_min), (tempVal[2] + item.main.temp_max), (tempVal[3] + item.clouds.all), (tempVal[4] + item.wind.speed) ];
            counter = counter + 1;
        }
        else{
            tempVal = [firstDay, tempVal[0]/counter,tempVal[1]/counter,tempVal[2]/counter,tempVal[3]/counter,tempVal[4]/counter];
            DayDetails.push(tempVal)
            tempVal = [0,0,0,0,0];
            tempVal = [(tempVal[0] + item.main.temp),( tempVal[1] + item.main.temp_min), (tempVal[2] + item.main.temp_max), (tempVal[3] + item.clouds.all), (tempVal[4] + item.wind.speed) ];
            counter = 1;
            firstDay = dateOnly;
        }
    });
    tempVal = [firstDay, tempVal[0]/counter,tempVal[1]/counter,tempVal[2]/counter,tempVal[3]/counter,tempVal[4]/counter];
    DayDetails.push(tempVal);
    console.log(DayDetails.length)

        return (
            <Grid container className={classes.root} spacing={16}>
            <Grid item xs={1} sm={1} className="iconButtonWrapper">
            {this.state.initialCard !== 0 && 
             <IconButton aria-label="prev" onClick={() => this.nextPrevBTNclicked("prev")} className="iconButton">
             <SkipPrevious/>
           </IconButton> 

            }
            </Grid>

            <Grid item xs={10} sm={10}>
            <Grid container className={classes.root} spacing={16}>
            {DayDetails.map((item, index) => (
                <SingleWeatherDayCard data={item} place={index} currInitialCard={this.state.initialCard} key={item[0]}/>
      ))}
      </Grid>
            </Grid>
             <Grid item xs={1} sm={1}>
             {(this.state.initialCard +3)  < DayDetails.length && 
              <IconButton aria-label="Next" onClick={() => this.nextPrevBTNclicked("next")} className="iconButton">
              <SkipNext /> 
               </IconButton>
      }
             </Grid>
             </Grid>
        );
    }
}

Slider.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default connect (mapStateToProps, {})(withStyles(styles)(Slider));