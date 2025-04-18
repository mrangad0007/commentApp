import {
  FETCH_COMMENTS,
  RATE_COMMENT,
  SAVE_COMMENTS,
  LOAD_SAVED_COMMENTS,
} from '../actions/commentActions';

// Initial state
const initialState = {
  comments: [],
  loading: false,
  error: null,
};

// Comment reducer
const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
        error: null,
      };
    case RATE_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.id === action.payload.commentId
            ? { ...comment, rating: action.payload.rating }
            : comment
        ),
        error: null,
      };
    case SAVE_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        error: null,
      };
    case LOAD_SAVED_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        error: null,
      };
    default:
      return state;
  }
};

export default commentReducer; 