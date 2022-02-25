import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {createStore} from "@reduxjs/toolkit";
import data from "./data/data.json";

const JSON_DATA = data.data.length;

const reducer = (state = {key: Math.floor(Math.random() * JSON_DATA), data: []}, action) => {
    if (action.type === "send_input") {
        state.data.push(action.text);
    } else if (action.type === "reset") {
        state = {key: state.key, data: []}
    } else if (action.type === "next") {
        state = {key: Math.floor(Math.random() * JSON_DATA), data: []}
    }
    return state;
}

let store = createStore(reducer)

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

