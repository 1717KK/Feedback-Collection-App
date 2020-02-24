import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
import axios from 'axios';
window.axios = axios;

// second argument: provide the initial state of application
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// two arguments: root component & where we are attempting to render that component to
// ReactDOM.render(...) 是渲染方法，所有的 js,html 都可通过它进行渲染绘制，他有两个参数，内容和渲染目标 js 对象
ReactDOM.render(
	//provide tag: a react component that knows how to read changes from our redux store 
	//any time the redux store gets some new states produced inside of it
	//the provider will inform all of its children components
	<Provider store={store}><App /></Provider>, 
	document.querySelector('#root')
);
