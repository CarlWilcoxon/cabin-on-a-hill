import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Game from '../Game/Game';

class App extends Component {
  render () {
  return(
    <div className="App">
      <Router>
        <Switch>
          <ProtectedRoute
            exact
            path='/'
            component={Game}
          />

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
