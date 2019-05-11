import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
  });

class Slider extends Component {
   
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const { classes } = this.props;
        return (
            <>
            <Grid item xs={6} sm={6}>
            {/* <Paper className={classes.root} elevation={2}> */}
            <p>'prev'</p>
            {/* </Paper> */}
            </Grid>

             <Grid item xs={6} sm={6}>
             {/* <Paper className={classes.root} elevation={2}> */}
             <p>'next'</p>
             {/* </Paper> */}
             </Grid>

             <Grid item xs={12} sm={12}>
             <p>3 pictures</p>
             </Grid>
             </>
        );
    }
}


Slider.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Slider);