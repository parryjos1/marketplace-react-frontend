
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../sell.css'

// upload an image

// <h3>Welcome to the sell page</h3>
// <form className="sell-form">
//   <label>Sell Item</label>
//   <input type="text" className="sell-input"></input>
//   <input type="submit" className="sell-submit" />
// </form>

let labelArray = []

class Sell extends Component {

  constructor(props){
    super(props);
    this.state = {
      userName: '',
      userId: '',
      email: '',
      previewSrc: '',
      imageText: '',
      imageLabels: [],
      selectedImageLabels: [],
      newItemName: '',
      price: '',
      cloudinaryURL: ''
    }
  }

  componentDidMount(){
    console.log(`Local storage is: ${localStorage.getItem('authToken')}`);

    // Find out info about the user of the current JWT token
    const authToken = localStorage.getItem('authToken');
    // axios.post('http://localhost:4000/products/identifyseller',{
    //   headers: {
    //       Authorization: "Bearer " + authToken,
    //   }
    // }
    // )

    // axios.get('http://localhost:4000/products/identifyseller')

    axios.get('http://localhost:4000/products/identifyseller', {
      headers: {
        Authorization: "Bearer " + authToken
      }
    })
    .then( res => {
      console.log('GOT USER', res);
      this.updateUserState( res );
    })
    .catch(err => console.warn('SELL USER AJAX ERROR!', err) );

  }

  // Method to update the state to users info
  updateUserState = (res) => {
    this.setState({userId: res.data.user._id, userName: res.data.user.name, email: res.data.user.email })
  }

  handleChange = (e) => {
    console.log(e.target.files);
    const file = e.target.files[0];
    console.log({file});

    // try upload
    const fd = new FormData();
    fd.append('file', file );
    fd.append('upload_preset', 'rzxjcm4t');
    console.log( fd );

    fetch('https://api.cloudinary.com/v1_1/dwjvh0hlj/image/upload', {
      method: 'POST',
      body: fd,
      // config: { headers: { 'Content-Type': 'multipart/form-data'} }
    })
    .then( res => res.json() )
    .then( data => {
      // console.log('RESPONSE', data)
      // new ajax reqjuest to Node backend with data.data....public_id and labels seleceted
      // console.log(`cloudinary UrL =  ${data.url}`);
      console.log(`cloudinary UrL body =  ${data.secure_url}`);
      this.setState({cloudinaryURL: data.secure_url})
    });


    var reader  = new FileReader();

    reader.addEventListener("load", () => {
      // preview.src = reader.result;
      this.setState({ previewSrc: reader.result });
      // this.submitVisionApiRequest( reader.result );
      const googleVision = this.submitVisionApiRequest( reader.result );
      console.log(`google vision is ${googleVision}`);

    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }

  } // handleChange()

  submitVisionApiRequest(base64Data){
  base64Data = base64Data.replace('data:image/jpeg;base64,', '');
  let body = {
    "requests": [
      {
        "image": {
          "content": base64Data,
        },
        "features": [
          {
            "type": "LABEL_DETECTION",
            "maxResults": 10
          },
          {
            "type": "TEXT_DETECTION",
            "maxResults": 4
          }
        ]
      }
    ]
  };

  // axios.post('http://localhost:4000/login', {
  //   email:   this.state.email,
  //   password: this.state.password
  // })
  // axios.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAcAWwGwIs7iNyPB5OdnCEG33wbJP8Re3s', {
  //   Authorization: ''
  // })

  axios.post(
    'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAcAWwGwIs7iNyPB5OdnCEG33wbJP8Re3s',
    body
  )

  // fetch({
  //    method: 'POST',
  //    url: 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAcAWwGwIs7iNyPB5OdnCEG33wbJP8Re3s',
  //    body: body
  //  })
   // .then((response) => console.log('google cloud vision response', response.body))
   // .then(res => console.log('google cloud vision response', res))
   .then( res => {

     const visionArray = res.data.responses[0].labelAnnotations;
     const visionLabelArray = []
     const imageLables = visionArray.map( l => {
       visionLabelArray.push(l.description)
     })
     console.log(`visionLabelArray is: ${visionLabelArray}`);
     this.setState({ imageLabels: visionLabelArray})

     console.log('Google Vision', res.data.responses[0].fullTextAnnotation.text)
     this.setState({ imageText: res.data.responses[0].fullTextAnnotation.text})
     return res

   })
   .catch(err => console.warn('Google Cloud Vision error!', err) );
  // fetch(
  //   'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAcAWwGwIs7iNyPB5OdnCEG33wbJP8Re3s',
  //   body
  // )
  // .then((response) => console.log(response));

} // end of handle api change

// googleVision(base64Data){
//   const vision = require('react-cloud-vision-api')
//   vision.init({auth: 'AIzaSyAcAWwGwIs7iNyPB5OdnCEG33wbJP8Re3s'})
//   const req = new vision.Request({
//     image: new vision.Image({
//       base64: base64Data,
//     }),
//     features: [
//       new vision.Feature('TEXT_DETECTION', 4),
//       new vision.Feature('LABEL_DETECTION', 10),
//     ]
//   })
//
//   return req
// }

onLabelClick = (e) => {
  e.preventDefault();
  // console.log('The link was clicked.');
  console.log(`${e.target.value} was clicked`);

  labelArray.push(e.target.value)

  this.setState({selectedImageLabels: labelArray})
}

itemNameChange = (e) => {
  this.setState({newItemName: e.target.value})
}

priceChange = (e) => {
  this.setState({price: e.target.value})
}


onNewItemSubmit = (e) => {

          // <input type="text" placeholder="Keywords" value={this.state.selectedImageLabels}/>
  e.preventDefault();
  const authToken = localStorage.getItem('authToken');

  let body = {
    name: this.state.newItemName,
    keywords: this.state.selectedImageLabels,
    price: this.state.price,
    seller: this.state.userId,
    sellerName: this.state.userName,
    image: this.state.cloudinaryURL
  }

  axios.post("http://localhost:4000/products/newsell", body, {
    headers: { Authorization: "Bearer " + authToken }
  })
  .then( res => {
    console.log('New Item submitted', res);
    // this.updateUserState( res );
  })
  .catch(err => console.warn('SELL USER AJAX ERROR!', err) );

  // this.props.history.push({
  //   pathname: '/products',
  //   // search: '?query=abc',
  //   state: { searchText: this.state.searchText }
  // })
}


  render() {
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




      {
        this.state.previewSrc && <img className="preview" src={this.state.previewSrc} />
      }

      <input type="file" onChange={this.handleChange}/>


        <div className="all-labels">
          {
            this.state.imageLabels.length > 0
            ?
            this.state.imageLabels.map( p =>
                <div className='labels'>
                  <button key={`label-${p}`} className='label-button' onClick={this.onLabelClick} value={p}>
                    {p}
                  </button>
                </div>
            )
            :
           <p></p>
          }
        </div>


      <form className="sell-new-item-form" onSubmit={this.onNewItemSubmit}>
        <input type="text" placeholder="Name" value={this.state.userName}/>
        <input type="text" placeholder="Item Name" onChange={this.itemNameChange} />

        <input type="text" placeholder="Price ($)" onChange={this.priceChange}/>
        <input type="submit" />
      </form>

      <div className="all-labels-google">
        {
          this.state.selectedImageLabels.length > 0
          ?
          this.state.selectedImageLabels.map( p =>
              <div className='labels-g'>
                <h4 key={`label-${p}`} className='label-button'>
                  {p}
                </h4>
              </div>
          )
          :
         <p></p>
        }
      </div>


      </div>
    )
  }
}

export default Sell
