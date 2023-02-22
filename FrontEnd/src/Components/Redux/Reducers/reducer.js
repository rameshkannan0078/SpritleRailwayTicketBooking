import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './CounterSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
});

export default rootReducer;
