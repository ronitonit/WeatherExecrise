import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { SkipPrevious, SkipNext } from '@material-ui/icons';
import SingleWeatherDayCard from '../components/singleWeatherDayCard';

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
        this.state = {initialCard :0}
    }

    nextPrevBTNclicked(clickedValue) {
        let val;
        debugger;
        if (clickedValue === "next") {
          val = this.state.initialCard + 3;
        } else {
          val = this.state.initialCard - 3;
        }

        this.setState({initialCard : val})
    }
   
    render() {
        const { classes } = this.props;
        
        return (
            <Grid container className={classes.root} spacing={16}>
            <Grid item xs={1} sm={1}>
            {this.state.initialCard !== 0 && 
             <IconButton aria-label="prev">
             <SkipPrevious onClick={() => this.nextPrevBTNclicked("prev")}/>
           </IconButton>
            }
            </Grid>

            <Grid item xs={10} sm={10}>
            <Grid container className={classes.root} spacing={16}>
            {this.props.data.map((item, index) => (
                <SingleWeatherDayCard data={item} place={index} currInitialCard={this.state.initialCard}/>
      ))}
      </Grid>
            </Grid>
             <Grid item xs={1} sm={1}>
             {(this.state.initialCard +3)  <= this.props.data.length && 
              <IconButton aria-label="Next">
              <SkipNext onClick={() => this.nextPrevBTNclicked("next")} /> 
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

export default withStyles(styles)(Slider);