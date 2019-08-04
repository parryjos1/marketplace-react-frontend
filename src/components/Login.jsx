import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {HashRouter as Router, Route} from 'react-router-dom';

class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: 'dh@gmail.com',
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

    const loginDetails = {
      username: this.state.email,
      password: this.state.password,
    }

    axios.post('http://localhost:4000/login', {
      email:   this.state.email,
      password: this.state.password
    })
    .then( res => {

      console.log('LOGIN SUCCESS', res);
      // axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      localStorage.setItem('authToken', res.data.token);
      this.props.history.push('/cart');

    })
    .catch( err => {
      console.log(err.response);
      if( 'response' in err ){
        if( err.response.status === 400 || err.response.status === 401 ){
          this.setState({ errorMessage: 'Invalid email or password'});
        } else {
          console.warn('OTHER ERROR', err.response, err);
        }
      } else {
        // No response, i.e. network-level error
        console.warn('NETWORK ERROR', err);
      }
    } )

  }

  render(){
    return(
      <div>

        <nav>
          <ul className="nav-list">
            <li className="nav-item-left"><div className="nav-item"><Link to="/">Home</Link></div></li>
            <li className="nav-item-right"><div className="nav-item">Cart</div></li>
            <li className="nav-item-right"><div className="nav-item">Sell</div></li>
            <li className="nav-item-right"><div className="nav-item"><Link to="/signup">Signup</Link></div></li>
            <li className="nav-item-right"><div className="nav-item"><Link to="/login">Login</Link></div></li>
          </ul>
        </nav>

        <h3>Login</h3>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="email" onChange={this.onChangeEmail} value={ this.state.email } />
          <br />
          <input type="text" placeholder="password" onChange={this.onChangePassword}/>
          <br />
          <input type="submit" />
        </form>
      </div>
    )
  }

}

export default Login;
