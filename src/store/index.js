import {combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import Reducers from './reducers';
import {configureStore} from '@reduxjs/toolkit';
const RootReducers = combineReducers({
  // reducers
  Reducers,
});

export const store = configureStore({
  reducer: RootReducers,
  middleware: [thunk],
});
