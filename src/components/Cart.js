import React, {Component} from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
// import {HashRouter as Router, Route} from 'react-router-dom';

export default class Cart extends Component {


  componentDidMount(){

    axios.get('http://localhost:4000/cart')
    .then( res => {
      console.log('GOT CART', res);
    })
    .catch(err => console.warn('CART AJAX ERROR!', err) );
  }

  render(){
    return (
      <div>
        <h1>SHOPPING CART</h1>
      </div>
    );
  }

}
