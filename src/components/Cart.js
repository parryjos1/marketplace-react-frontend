import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../cart.css"
import Speech from './speechRecog';
// import { Link } from 'react-router-dom';
// import {HashRouter as Router, Route} from 'react-router-dom';

export default class Cart extends Component {

  constructor(props){
    super(props);
    this.state = {
      products: [],
      userId: '',
      allProducts: [],
      stateUpdater: ''
    }
  }

  // componentDidUpdate(){
  //   this.deconstructState()
  // }

  componentDidMount(){

    // axios.get('http://localhost:4000/cart')
    // .then( res => {
    //   console.log('GOT CART', res);
    // })
    // .catch(err => console.warn('CART AJAX ERROR!', err) );
        const authToken = localStorage.getItem('authToken');
    //Get the users Cart
    axios.get('http://localhost:4000/products/identifyseller', {
      headers: {
        Authorization: "Bearer " + authToken
      }
    })
    .then( res => {
      console.log('GOT USER', res);
      this.setState({userId: res.data.user._id})
      // console.log(res.data.user.cart);

      const usersCart = res.data.user.cart
      console.log(usersCart);

      this.setState({products: usersCart})

      this.deconstructState(usersCart);

      // for (var i = 0; i < usersCart.length; i++) {
      //   thisproducts.push(usersCart[i])
      // }
      // this.updateUserState( res );
    })
    .then(     this.setState({stateUpdater: 'updated!'}))
    .catch(err => console.warn('SELL USER AJAX ERROR!', err) );

    // this.setState({stateUpdater: 'updated!'})

  }

  deconstructState = (cart) => {

    const productRequests = [];

    for (var i = 0; i < cart.length; i++) {
      console.log(cart[i]);

      let productId = cart[i]
      const authToken = localStorage.getItem('authToken');

      // Create an array of promises, one for each request (UGGGHHH)
      productRequests.push(
        axios.get(`http://localhost:4000/product/${productId}`, {
          headers: {
            Authorization: "Bearer " + authToken
          }
        })
      );

    }

    // Wait for all requests to finish (resolve)
    Promise.all( productRequests )
    .then( res => {
      console.log('ALL FINISHED', res);
      const products = res.map( item => item.data[0] );
      this.setState({ allProducts: products });
    })
    .catch(err => console.warn('PROBLEM GETTING ERROR!', err) );

    //   axios.get(`http://localhost:4000/product/${productId}`, {
    //     headers: {
    //       Authorization: "Bearer " + authToken
    //     }
    //   })
    //   .then( res => {
    //     console.log('GOT ZE PRODUCT', res);
    //
    //     newProducts.push([{'name': res.data[0].name}, {"price": res.data[0].price}, {"img": res.data[0].image} ] )
    //     // var joined = this.state.allProducts.concat([res.data[0].name, res.data[0].price, res.data[0].image ]);
    //     // this.setState({ allProducts: joined })
    //     // // this.setState({
    //     //   allProducts: [res.data[0].name, res.data[0].price, res.data[0].image ]
    //     // })
    //   })
    //   .catch(err => console.warn('PROBLEM GETTING ERROR!', err) );
    //
    // }


  }

  addNewToCart = () => {
    console.log(`name is: ${this.props.location.state.name}`);
  }

  render(){
    return (
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
        <h1>SHOPPING CART</h1>
        <button>CHECKOUT</button>
        <br />
        {/*
     Count { this.state.allProducts.length}
     */}
          <div className="all-products">
            {
              this.state.allProducts.length > 0
              ?
              this.state.allProducts.map( p =>
                <div>
                <div>Product: {p.name}</div>
                <div>Price ($): {p.price}</div>
                <img className="checkout-img" src={p.image} />
                <br />
                </div>

              )
              :
             <p>cart is empty</p>
            }
          </div>

          <Speech />

      </div>
    );
  }

}
