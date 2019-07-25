import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import Routes from './Routes';

import axios from 'axios';

// check localStorage, load auth token into axios default header
const authToken = localStorage.getItem('authToken');
if( authToken ){
  axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
}

ReactDOM.render(Routes, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
