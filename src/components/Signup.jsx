import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {HashRouter as Router, Route} from 'react-router-dom';

class Signup extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    }
  }

  componentDidMount(){
    console.log('we are in chewie');
  }

  onChangeEmail = (e) => {
    this.setState({email: e.target.value})
  }
  onChangeName = (e) => {
    this.setState({name: e.target.value})
  }
  onChangePassword = (e) => {
    this.setState({password: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.name);

    const newUser = {
      username: this.state.email,
      password: this.state.password,
      name: this.state.name,
    }

    axios.post('http://localhost:4000/users', newUser)
          .then(res => console.log(res.data));
  }

  render(){
    return(
      <div>
        <h3>Sign up</h3>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Name" onChange={this.onChangeName} />
          <br />
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
