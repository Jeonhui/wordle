import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {createStore} from "@reduxjs/toolkit";

const reducer = (state= [], action)=>{
    if (action.type ==="send_input"){
        state.push(action.text);
        console.log(state);
    }
    return state;
}
let store = createStore(reducer)

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

