import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { SkipPrevious, SkipNext } from "@material-ui/icons";
import SingleWeatherDayCard from "../singleWeatherDayCard/singleWeatherDayCard";
import { getAverageForDiffValuesForDay } from "../../utils/helperFunctions";
import "../Slider/style.css";

const mapStateToProps = state => ({
  city: state.allData.weatherData.city,
  weather: state.allData.weatherData.list[0].weather[0],
  weatherList: state.allData.weatherData.list
});

const styles = theme => ({
  root: {
    flexGrow: 1,
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class Slider extends Component {
  constructor(props) {
    super(props);
    // state for initialCard is not stored in redux as it is only specific to this component
    // and not interacting with other components.
    this.state = { initialCard: 0 };
  }

  nextPrevBTNclicked(clickedValue) {
    let initialCardValue;
    if (clickedValue === "next") {
      initialCardValue = this.state.initialCard + 3;
    } else {
      initialCardValue = this.state.initialCard - 3;
    }

    this.setState({ initialCard: initialCardValue });
  }

  render() {
    const { classes } = this.props;

    // get average details for each day.
    let DayDetailsAverage = getAverageForDiffValuesForDay(
      this.props.weatherList
    );

    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={1} sm={1} md={1} lg={1} className="iconButtonWrapper">
          {this.state.initialCard !== 0 && (
            <IconButton
              aria-label="prev"
              onClick={() => this.nextPrevBTNclicked("prev")}
              className="iconButton"
            >
              <SkipPrevious />
            </IconButton>
          )}
        </Grid>

        <Grid item xs={10} sm={10} md={10} lg={10}>
          <Grid container className={classes.root} spacing={16}>
            {DayDetailsAverage.map((item, index) => (
              <SingleWeatherDayCard
                data={item}
                place={index}
                currInitialCard={this.state.initialCard}
                key={item[0]}
              />
            ))}
          </Grid>
        </Grid>
        <Grid item xs={1} sm={1}>
          {this.state.initialCard + 3 < DayDetailsAverage.length && (
            <IconButton
              aria-label="Next"
              onClick={() => this.nextPrevBTNclicked("next")}
              className="iconButton"
            >
              <SkipNext />
            </IconButton>
          )}
        </Grid>
      </Grid>
    );
  }
}

Slider.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(Slider));
