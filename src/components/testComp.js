import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import ReactLoading from 'react-loading';
import * as legoData from "./legoloading.json";
import * as doneData from "./doneloading.json";



class testComp extends Component {


  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: undefined,
      done: undefined
    }
  }

  renderLocation(){
    // return <div>this.props.history.location.state.searchText</div>
    console.log('render location running');
    console.log(this.props.history.location.state.searchText);
    // console.log(this.state.location.state.searchText);
    // console.log(this.state.location.state.searchText);
    // return <div>{this.state.location.state.searchText}</div>
    return this.props.history.location.state.searchText
  }



  render(){
    return(
      <div>
      <div>{this.renderLocation()}</div>
      <p>Welcome to the test Comp</p>
      </div>
    )
  }
}

export default testComp
