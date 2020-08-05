import React, { Component } from 'react';
import { InputAdornment } from '@material-ui/core';
import { connect } from 'react-redux';
import './App.css';

// Need to fix colors


class App extends Component {

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

  return(
    <div className="Home">
      <header className="Home-header">
      <p>
          {this.props.reduxState.output.map((word, index) => <span key={index}>{word + ' '}</span>)}
        </p>
        <form onSubmit={this.submitHandler}>
        {">"}
          <input
            onChange={(e) => this.changeHandler('currentInput', e)}
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


export default connect(mapStateToProps)(App);

// OLD APP.js

// import React, {Component} from 'react';
// import {
//   HashRouter as Router,
//   Route,
//   Redirect,
//   Switch,
// } from 'react-router-dom';

// import {connect} from 'react-redux';

// import Nav from '../Nav/Nav';
// // import Footer from '../Footer/Footer';

// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

// import Spike from '../Spike/Spike';
// import UserPage from '../UserPage/UserPage';
// import InfoPage from '../InfoPage/InfoPage';

// // import './App.css';

// class App extends Component {
//   componentDidMount () {
//     this.props.dispatch({type: 'FETCH_USER'})
//   }

//   render() {
//     return (
//       <Router>
//         <div>
//           <Nav />
//           <Switch>
//             {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
//             <Redirect exact from="/" to="/home" />
//             {/* Visiting localhost:3000/about will show the about page.
//             This is a route anyone can see, no login necessary */}
//             <Route
//               exact
//               path="/about"
//               component={Spike}
//             />
//             {/* For protected routes, the view could show one of several things on the same route.
//             Visiting localhost:3000/home will show the UserPage if the user is logged in.
//             If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
//             Even though it seems like they are different pages, the user is always on localhost:3000/home */}
//             <ProtectedRoute
//               exact
//               path="/home"
//               component={UserPage}
//             />
//             {/* This works the same as the other protected route, except that if the user is logged in,
//             they will see the info page instead. */}
//             <ProtectedRoute
//               exact
//               path="/info"
//               component={InfoPage}
//             />
//             {/* If none of the other routes matched, we will show a 404. */}
//             <Route render={() => <h1>404</h1>} />
//           </Switch>
//           {/* <Footer /> */}
//         </div>
//       </Router>
//   )}
// }

// export default connect()(App);
