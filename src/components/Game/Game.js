import React, { Component } from 'react';
import { connect } from 'react-redux';

class Game extends Component {

  state = {
    currentInput: '',
    arrayOfWords: ['default', 'words'],
    roomDescription: this.props.reduxState.room.description || '',
  }

  componentDidMount = () => {
    this.props.dispatch({
      type: 'FETCH_ROOM'
    })
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

    // put the user command on the display
    this.props.dispatch({
      type: 'OUTPUT',
      payload: arrayOfWords.join(' '),
    })

    console.log(arrayOfWords);
    // if they are trying to LOOK around the room, I don't need to talk to the server
    if (arrayOfWords.length === 1 && arrayOfWords[0] === "LOOK" ) {
      // update the room reducer
      this.props.dispatch({
        type: 'FETCH_ROOM'
      })
      // output the room description
      this.props.dispatch({
        type: 'OUTPUT',
        payload: this.props.reduxState.room.description,
      })

    } else {
      // process the command to figure out what to do
      this.props.dispatch({
        type: 'COMMAND',
        payload: arrayOfWords,
      });
    }
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
