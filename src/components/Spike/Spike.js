import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { TextField, InputAdornment} from '@material-ui/core';
import { connect } from 'react-redux';

const styles = theme => ({
  root: {
  }
})

class Spike extends Component {

  state = {
    currentInput: '',
    arrayOfWords: ['taco', 'burrito'],
  }

  changeHandler = (propertyName, event) => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value,
    });
  }

  submitHandler = (event) => {
    event.preventDefault();
    let arrayOfWords = this.state.currentInput.toUpperCase().split(' ');
    this.setState({
      ...this.state,
      arrayOfWords,
      currentInput: '',
    })
    if (this.state.arrayOfWords.length > 1) {
      this.props.dispatch({
        type: arrayOfWords[0],
        payload: arrayOfWords,
      });
    } else {
      this.props.dispatch({
        type: arrayOfWords[0]
      })
    }
  }

  render () {
  const {classes} = this.props;

  return(
    <div className="Home">
      <header className="Home-header">
        <p>
          {this.props.reduxState.output.map((word, index) => <span key={index}>{word + ' '}</span>)}
        </p>
        <form onSubmit={this.submitHandler}>
          <TextField
            onChange={(e) => this.changeHandler('currentInput', e)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {">"}
                </InputAdornment>
              ),
            }}              variant={'standard'}
            color={"#76ff03"}  //Change color to flourescent green
            value={this.state.currentInput}
          />
        </form>
      </header>
    </div>
  )};
}

const mapStateToProps = reduxState => ({
  reduxState,
});

Spike.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(connect(mapStateToProps)(Spike));