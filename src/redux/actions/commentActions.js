import AsyncStorage from '@react-native-async-storage/async-storage';

// Action Types
export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const RATE_COMMENT = 'RATE_COMMENT';
export const SAVE_COMMENTS = 'SAVE_COMMENTS';
export const LOAD_SAVED_COMMENTS = 'LOAD_SAVED_COMMENTS';

// Initial comments data
const initialComments = [
  {
    id: 1,
    title: 'First Comment',
    body: 'This is a great app!',
    rating: 0,
  },
  {
    id: 2,
    title: 'Second Comment',
    body: 'I love the design!',
    rating: 0,
  },
  {
    id: 3,
    title: 'Third Comment',
    body: 'Very user-friendly interface.',
    rating: 0,
  },
];

// Action Creators
export const fetchComments = () => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_COMMENTS,
      payload: initialComments,
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};

export const rateComment = (commentId, rating) => async (dispatch, getState) => {
  try {
    // First dispatch the rating change
    dispatch({
      type: RATE_COMMENT,
      payload: { commentId, rating },
    });

    // Get the updated state
    const { comments } = getState().comments;
    
    // Save to AsyncStorage
    await AsyncStorage.setItem('comments', JSON.stringify(comments));
    
    // Confirm save was successful
    dispatch({
      type: SAVE_COMMENTS,
      payload: comments,
    });
  } catch (error) {
    console.error('Error rating comment:', error);
  }
};

export const saveComments = (comments) => async (dispatch) => {
  try {
    // Save to AsyncStorage first
    await AsyncStorage.setItem('comments', JSON.stringify(comments));
    
    // Then update Redux state
    dispatch({
      type: SAVE_COMMENTS,
      payload: comments,
    });
  } catch (error) {
    console.error('Error saving comments:', error);
  }
};

export const loadSavedComments = () => async (dispatch) => {
  try {
    const savedComments = await AsyncStorage.getItem('comments');
    if (savedComments) {
      const parsedComments = JSON.parse(savedComments);
      if (Array.isArray(parsedComments) && parsedComments.length > 0) {
        dispatch({
          type: LOAD_SAVED_COMMENTS,
          payload: parsedComments,
        });
        return parsedComments;
      }
    }
    // If no valid saved comments, load initial
    dispatch({
      type: FETCH_COMMENTS,
      payload: initialComments,
    });
    return initialComments;
  } catch (error) {
    console.error('Error loading saved comments:', error);
    // On error, load initial comments
    dispatch({
      type: FETCH_COMMENTS,
      payload: initialComments,
    });
    return initialComments;
  }
}; 