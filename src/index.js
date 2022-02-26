import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {createStore} from "@reduxjs/toolkit";
import data from "./data/data.json";

const reducer = (state = {
    key: data.data[Math.floor(Math.random() * data.data.length)].word,
    data: [],
    status: {correct: new Set(), wrong: new Set(), notInclude: new Set()},
    log: ""
}, action) => {
    if (action.type === "send_input") {
        state.data.push(action.text);
        for (let i = 0; i < 5; i++) {
            if (state.key[i] === action.text[i])
                state.status.correct.add(action.text[i]);
            else if (state.key.indexOf(action.text[i]) !== -1) {
                state.status.wrong.add(action.text[i]);
            } else {
                state.status.notInclude.add(action.text[i]);
            }
        }
    } else if (action.type === "reset") {
        state = {
            key: state.key,
            data: [],
            status: {correct: new Set(), wrong: new Set(), notInclude: new Set()},
            log: state.log
        }
    } else if (action.type === "next") {
        state = {
            key: data.data[Math.floor(Math.random() * data.data.length)].word,
            data: [],
            status: {correct: new Set(), wrong: new Set(), notInclude: new Set()},
            log: ""
        }
    } else if (action.type === "push_Log") {
        state = {
            ...state, log: state.log + action.text
        }
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

