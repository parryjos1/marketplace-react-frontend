import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import Home from './components/Homepage';
import Signup from './components/Signup';
import Login from './components/Login';
import Cart from './components/Cart';
import SearchProduct from './components/SearchProduct'
import testComp from './components/testComp'



const Routes = (
  <Router>
    <div>
      <Route exact path="/" component={ Home } />
      <Route exact path="/signup" component={ Signup } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/cart" component={ Cart } />
      <Route exact path="/products" component={ SearchProduct } />
      <Route exact path="/test" component={ testComp } />
    </div>
  </Router>
)

export default Routes;
