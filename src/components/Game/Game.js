import React, { Component } from 'react';
import { connect } from 'react-redux';

class Game extends Component {

  state = {
    currentInput: '',
    arrayOfWords: ['default', 'words'],
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

  return(
    <div className="Game">
      <header className="Game-header">
      <p>
          {this.props.reduxState.output.map((word, index) => <span key={index}>{word + ' '}</span>)}
      </p>
      </header>
      <form onSubmit={this.submitHandler}>
        {">"}
          <input
            onChange={(e) => this.changeHandler('currentInput', e)}
            value={this.state.currentInput}
          />
        </form>
    </div>
  )};
}

const mapStateToProps = reduxState => ({
  reduxState,
});


export default connect(mapStateToProps)(Game);
