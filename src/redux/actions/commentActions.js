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
    // In a real app, we would fetch from API here
    dispatch({
      type: FETCH_COMMENTS,
      payload: initialComments,
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};

export const rateComment = (commentId, rating) => ({
  type: RATE_COMMENT,
  payload: { commentId, rating },
});

export const saveComments = (comments) => async (dispatch) => {
  try {
    await AsyncStorage.setItem('comments', JSON.stringify(comments));
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
      dispatch({
        type: LOAD_SAVED_COMMENTS,
        payload: JSON.parse(savedComments),
      });
    }
  } catch (error) {
    console.error('Error loading saved comments:', error);
  }
}; 