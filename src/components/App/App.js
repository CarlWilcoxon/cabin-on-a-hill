import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import LoginPage from '../LoginPage/LoginPage';

class App extends Component {


  render () {

  return(
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path='/'
            component={LoginPage}
          />

          {/* <ProtectedRoute
            exact
            path="/game"
            component={Game}
          /> */}

          {/* if no other paths work, display 404 */}
          <Route render={() => <h1>404</h1>} />

        </Switch>
      </Router>
    </div>
  )};
}

const mapStateToProps = reduxState => ({
  reduxState,
});


export default connect(mapStateToProps)(App);
