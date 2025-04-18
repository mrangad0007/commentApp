import { combineReducers } from 'redux';
import commentReducer from './commentReducer';

// Combine all reducers
const appReducer = combineReducers({
  comments: commentReducer,
});

// Root reducer with state reset capability
const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer; 