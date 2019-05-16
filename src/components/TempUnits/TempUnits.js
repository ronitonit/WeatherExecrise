import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { changeTempUnitOnChange } from "../../actions/weatherActions";
import "../TempUnits/style.css";

const mapStateToProps = state => ({
  tempUnit: state.allData.tempUnit
});

const styles = theme => ({
  root: {
    display: "flex",
    color: "#fff",
    flexGrow: 1
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class TempUnits extends Component {
  // when radio button is clicked change the state in store
  handleChange = event => {
    debugger;
    let changedVal = event.target.value;
    if (changedVal !== this.props.tempUnit)
      this.props.changeTempUnitOnChange(changedVal);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="RadioButtonsDiv">
        <RadioGroup
          aria-label="unit"
          name="unit1"
          className={classes.group}
          value={this.props.tempUnit}
          onChange={this.handleChange}
        >
          <FormControlLabel
            value="Celcius"
            control={<Radio />}
            label="Celcius"
          />
          <FormControlLabel
            value="Fahrenheit"
            control={<Radio />}
            label="Fahrenheit"
          />
        </RadioGroup>
      </div>
    );
  }
}

TempUnits.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { changeTempUnitOnChange }
)(withStyles(styles)(TempUnits));
