import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Comment from '../components/Comment';
import { loadSavedComments } from '../redux/actions/commentActions';

const CommentsScreen = () => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.comments);

  useEffect(() => {
    // Load saved comments on mount
    dispatch(loadSavedComments());
  }, [dispatch]);

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