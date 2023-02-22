import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './../Reducers/reducer';
  

const persistConfig = {
  key: 'root',
  storage,
};

const registerAction = (key) => ({
    type: 'REGISTER',
    payload: key,
  });
  
  const register = (key) => {
    return (dispatch) => {
      dispatch(registerAction(key));
    };
  };
  
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
