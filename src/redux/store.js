/* eslint-disable no-console */
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['LOAD_SAVED_COMMENTS', 'SAVE_COMMENTS'],
      },
    }).concat(thunk),
});

export default store; 