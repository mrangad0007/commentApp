import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Rating } from 'react-native-ratings';
import { useDispatch } from 'react-redux';
import { rateComment } from '../redux/actions/commentActions';

const Comment = ({ comment }) => {
  const dispatch = useDispatch();
  const [currentRating, setCurrentRating] = useState(comment.rating);

  const handleRating = (rating) => {
    // Only update if the rating has changed
    if (rating !== currentRating) {
      setCurrentRating(rating);
      dispatch(rateComment(comment.id, rating));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{comment.title}</Text>
      <Text style={styles.body}>{comment.body}</Text>
      <Rating
        type="star"
        ratingCount={5}
        imageSize={30}
        showRating
        startingValue={currentRating}
        onFinishRating={handleRating}
        style={styles.rating}
        readonly={false}
        fractions={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  body: {
    fontSize: 16,
    marginBottom: 12,
  },
  rating: {
    paddingVertical: 10,
  },
});

export default Comment; 