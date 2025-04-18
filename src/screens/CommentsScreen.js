import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Comment from '../components/Comment';
import { fetchComments, loadSavedComments, saveComments } from '../redux/actions/commentActions';

const CommentsScreen = () => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.comments);

  useEffect(() => {
    // Try to load saved comments first
    dispatch(loadSavedComments());
    // Then fetch initial comments
    dispatch(fetchComments());
  }, [dispatch]);

  useEffect(() => {
    // Save comments whenever they change
    if (comments.length > 0) {
      dispatch(saveComments(comments));
    }
  }, [comments, dispatch]);

  const renderComment = ({ item }) => <Comment comment={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    paddingVertical: 16,
  },
});

export default CommentsScreen; 