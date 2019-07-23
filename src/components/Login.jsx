import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {HashRouter as Router, Route} from 'react-router-dom';

class Signup extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  componentDidMount(){

  }

  onChangeEmail = (e) => {
    this.setState({email: e.target.value})
  }
  onChangePassword = (e) => {
    this.setState({password: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.email, this.state.password);
  }

  render(){
    return(
      <div>
        <h3>Login</h3>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="email" onChange={this.onChangeEmail} />
          <br />
          <input type="text" placeholder="password" onChange={this.onChangePassword}/>
          <br />
          <input type="submit" />
        </form>
      </div>
    )
  }

}

export default Signup;
