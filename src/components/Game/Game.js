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
    this.props.dispatch({
      type: 'COMMAND',
      payload: arrayOfWords,
    });
  }

  render () {

  return(
    <div className="Game">
      <header className="Game-output">
        {this.props.reduxState.output.map((word, index) => <p key={index}>{word}</p>)}
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
