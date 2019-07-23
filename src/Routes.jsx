import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';


const Routes = (
  <Router>
    <div>
      <Route exact path="/signup" component={ Signup } />
      <Route exact path="/login" component={ Login } />
    </div>
  </Router>
)

export default Routes;
