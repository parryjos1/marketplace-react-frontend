import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import ReactLoading from 'react-loading';
import * as legoData from "./legoloading.json";
import * as doneData from "./doneloading.json";

// Created with https://levelup.gitconnected.com/react-loading-screen-tactics-improving-user-experience-9d115ef92d6b
const defaultOptions = {
   loop: true,
   autoplay: true,
   animationData: legoData.default,
   rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
   }
}

const defaultOptions2 = {
   loop: false,
   autoplay: true,
   animationData: doneData.default,
   rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
   }
};

class SearchProduct extends Component {

  // Step 1 make axios call

  // step 2 save to state --> display

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: undefined,
      done: undefined,
      searchText: ''
    }
  }

  // TODO Question for Luke how to best make the API call ? is saving to state the most efficient?
  componentDidMount(){
    // console.log(`location: ${this.props.location.state.searchText}`);

    // const search = this.props.location.state.searchText
    // if (search.length > 0) {
    //   console.log(`The search term is: ${search}`);
    // } else {
    //   console.log(`There is nothing in the search term`);
    // }

    this.handleParentState()
    setTimeout(() => {
      // console.log(this.props.location.state.searchText);
     // axios.get('http://localhost:4000/products')

     // axios.post('http://localhost:4000/products', {
     axios.post('https://project3-marketplace-backend.herokuapp.com/products', {
       headers: {searchText: this.state.searchText}
     })
     .then( res => {
       console.log('GOT PRODUCTS', res.data);
       this.setState({ products: res.data})
     })
     .then( res => {
       // console.log(this.props.location.state.searchText);
     })
     .then(json => {
        this.setState({ loading: true });
        setTimeout(() => {
           this.setState({ done: true });
        }, 1000);
     });
  }, 1200);

  }

  handleParentState = () => {
    this.setState({searchText: this.props.history.location.state.searchText})
  }


  render(){
    return(
      <div>
        <nav>
          <ul className="nav-list">
            <li className="nav-item-left"><div className="nav-item"><Link to="/">Home</Link></div></li>
            <li className="nav-item-right"><div className="nav-item"><Link to="/cart">Cart</Link></div></li>
            <li className="nav-item-right"><div className="nav-item">Sell</div></li>
            <li className="nav-item-right"><div className="nav-item"><Link to="/signup">Signup</Link></div></li>
            <li className="nav-item-right"><div className="nav-item"><Link to="/login">Login</Link></div></li>
          </ul>
        </nav>

        <h3>Welcome to the Search Products </h3>

        <div>
            {!this.state.done ? (
              <FadeIn>
                <div class="d-flex justify-content-center align-items-center">
                  <h1>fetching pizza</h1>
                  {!this.state.loading ? (
                    <Lottie options={defaultOptions} height={120} width={120} />
                  ) : (
                    <Lottie options={defaultOptions2} height={120} width={120} />
                  )}
                </div>
              </FadeIn>
            ) : (
              <div className="all-products">
                {
                  this.state.products.length > 0
                  ?
                  this.state.products.reverse().map( p =>
                    <Link to={`/product/${p._id}`}>
                      <div className='products'>
                        <div key={p._id} className='listings-left'>
                          {p.name}
                        </div>
                        <div className='listings-right'>
                          <img src={p.image} alt="item_image" />
                        </div>
                        <br></br>
                      </div>
                    </Link>
                  )
                  :
                 <p>propertyResults is still empty</p>
                }
              </div>
            )}
         </div>

      </div>
    )
  }
}

export default SearchProduct
