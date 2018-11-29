import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  root: {
    flexGrow: 1,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  }
});

class FilledTextFields extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSignIn = event => {
      event.preventDefault();
      console.log(`User: ${this.state.username} +  Pass: ${this.state.password}`)
  }

  render() {
    const { classes } = this.props;

    return (
    <div className={classes.root}>
    <Grid container spacing={24}>

      <form noValidate autoComplete="off">
    <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
    >
      <Grid item xs={12} sm={6}>
        <TextField
            required
            id="username"
            label="Username"
            className={classes.textField}
            onChange={this.handleChange('username')}
            margin="normal"
            variant="filled"
            />
      </Grid>
      <Grid item xs={12} sm={6}>
      <TextField
          required
          id="filled-password-input"
          label="Password"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          onChange={this.handleChange('password')}
          margin="normal"
          variant="filled"
        />
      </Grid>
    </Grid>
      </form>
        <Grid item xs={12} sm={12}>
        <Button 
        variant="contained" 
        disabled={this.state.username && this.state.password ? false : true} 
        size="large" 
        onClick={this.handleSignIn}
        className={classes.button}
        color="primary"
        >
        Sign In!
        </Button>
        </Grid>
       
      </Grid>
      </div>
    );
  }
}

FilledTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilledTextFields);
