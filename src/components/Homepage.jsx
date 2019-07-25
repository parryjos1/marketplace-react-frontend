import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import '../index.css'
import TopCategories from './TopCategories'
import SearchProduct from './SearchProduct'


class Homepage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    }
  }

  componentDidMount() {
    this.effect = window.VANTA.BIRDS({
      el: "#my-element",
      // backgroundColor: 0xd2d8e1

      backgroundColor: 0xa8dadc,
      color1: 0xececec,
      color2: 0xeb554d,
      colorMode: "lerpGradient",
      birdSize: 1.2

      // backgroundColor: 0x5cdb95,
      // color1: 0xedf5e1,
      // color2: 0x05386b,
      // colorMode: "lerp"
    })
  }


  componentWillUnmount() {
    if (this.effect) this.effect.destroy()
  }

  onChangeSearch = (e) => {
    this.setState({searchText: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // this.props.history.push('/products');

    console.log(`within handleSubmit the searchText is:  ${this.state.searchText}`);

    this.props.history.push({
      pathname: '/products',
      // search: '?query=abc',
      state: { searchText: this.state.searchText }
    })
  }


  render(){
    return(
      <div>
        <nav>
          <ul className="nav-list">
            <li className="nav-item-left"><div className="nav-item">Home</div></li>
            <li className="nav-item-right"><div className="nav-item">Cart</div></li>
            <li className="nav-item-right"><div className="nav-item">Sell</div></li>
            <li className="nav-item-right"><div className="nav-item"><Link to="/signup">Signup</Link></div></li>
            <li className="nav-item-right"><div className="nav-item"><Link to="/login">Login</Link></div></li>
          </ul>
        </nav>

        <div className="background-homepage">
          <p id="greeting-homepage">Your One Stop Shop</p>
          <form className="search-form-homepage" onSubmit={this.handleSubmit}>
            <input type="text" id="search-bar-homepage" className="form-field" placeholder="Books, Electronics, Hawaiian Shirts e.c.t" onChange={ this.onChangeSearch} />

            <input type="submit" id="submit-homepage" />

          </form>

          <div id="my-element" />
        </div>

        <h2 className="title-homepage">Everything.Ever.</h2>

        <TopCategories />


      </div>
    )
  }
}

export default Homepage
