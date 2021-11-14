/**
 * @format
 */
import 'react-native-gesture-handler';
 import React from 'react';
 import {AppRegistry} from 'react-native';
 import {name as appName} from './app.json';
 import App from './App';
 import {Provider} from 'react-redux';
 import rootReducer from './src/redux/index';
 import {applyMiddleware, createStore} from 'redux';
 import thunkMiddleware from 'redux-thunk';
 
 const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
 
 const Redux = () => (
   <Provider store={createStoreWithMiddleware(rootReducer)}>
     <App />
   </Provider>
 );
 
 AppRegistry.registerComponent(appName, () => Redux);
 