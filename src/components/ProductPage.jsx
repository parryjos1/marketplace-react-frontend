import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

class Product extends Component {

  constructor(props){
    super(props);
    this.state = {
      userName: '',
      userId: '',
      email: '',
      imageText: '',
      price: '',
      cloudinaryURL: '',
      keywords: [],
      productName: '',
      productID: ''
    }
  }

  componentDidMount(){
    const authToken = localStorage.getItem('authToken');
    const productId = this.props.match.params.id;
    console.log(`the id = ${this.props.match.params.id}`);

    axios.get('http://localhost:4000/products/identifyseller', {
      headers: {
        Authorization: "Bearer " + authToken
      }
    })
    .then( res => {
      console.log('GOT USER', res);
      this.setState({userId: res.data.user._id})
      // this.updateUserState( res );
    })
    .catch(err => console.warn('SELL USER AJAX ERROR!', err) );

    axios.get(`http://localhost:4000/product/${productId}`, {
      headers: {
        Authorization: "Bearer " + authToken
      }
    })
    .then( res => {
      console.log('GOT PRODUCT', res);
      this.setState({
        userName: res.data[0].sellerName,
        cloudinaryURL: res.data[0].image,
        price: res.data[0].price,
        keywords: res.data[0].keywords,
        productName: res.data[0].name,
        productID: res.data[0]._id
      })
    })
    .catch(err => console.warn('PROBLEM GETTING ERROR!', err) );
  }

  onCartClick = (e) => {
    e.preventDefault()
    console.log('clicked');

    const authToken = localStorage.getItem('authToken');

    let body = {
      name: this.state.productName,
      price: this.state.price,
      seller: this.state.userId,
      sellerName: this.state.userName,
      image: this.state.cloudinaryURL,
      productID: this.state.productID
    }

    axios.post("http://localhost:4000/cartadd", body, {
      headers: { Authorization: "Bearer " + authToken }
    })
    .then( res => {
      console.log('New Item submitted', res);
      // this.updateUserState( res );
    })
    .catch(err => console.warn('SELL USER AJAX ERROR!', err) );

    this.props.history.push({
      pathname: '/cart',
      // // search: '?query=abc',
      // state: {
      //   price: this.state.price,
      //   name: this.state.productName,
      //   image: this.state.cloudinaryURL
      //
      // }
    })

  }

  render(){
    return(
      <div>
        <nav>
          <ul className="nav-list">
            <li className="nav-item-left"><div className="nav-item"><Link to="/">Home</Link></div></li>
            <li className="nav-item-right"><div className="nav-item">Cart</div></li>
            <li className="nav-item-right"><div className="nav-item"><Link to="/sell">Sell</Link></div></li>
            <li className="nav-item-right"><div className="nav-item"><Link to="/signup">Signup</Link></div></li>
            <li className="nav-item-right"><div className="nav-item"><Link to="/login">Login</Link></div></li>
          </ul>
        </nav>
        <p>Welcome to the Product page </p>
        <button onClick={this.onCartClick}>Add to a la carte</button>
        <div className="product-page-container">
          <div className="product-page-name">{this.state.productName}</div>
          <div className="product-page-price">{this.state.price}</div>
          <img src={this.state.cloudinaryURL} />
        </div>
      </div>
    )
  }
}

export default Product
