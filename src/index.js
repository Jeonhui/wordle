import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {createStore} from "@reduxjs/toolkit";

const reducer = (state = "", action)=>{
    if (action.type === "입력"){
        state="a"
        return state
    }else if(action.type === "제출"){
    }
    return state
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

