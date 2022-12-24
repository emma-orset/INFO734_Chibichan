import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.scss'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from "./reducers"

// Ne garder qu'un seul des deux, et doit être supprimé quand on doit mettre en prod
import {composeWithDevTools} from 'redux-devtools-extension'
//import logger from 'redux-logger'


const store = createStore(
  //rootReducer, composeWithDevTools(applyMiddleware(thunk, logger))
  rootReducer, composeWithDevTools(applyMiddleware(thunk))

)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
     <App />
  </Provider>
   

);
