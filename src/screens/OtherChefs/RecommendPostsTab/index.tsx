import {Text, View} from 'react-native';
import React from 'react';
import {ScaledSheet} from 'react-native-size-matters/extend';

const RecommendPostsTab = () => {
  console.log('recommend');

  return (
    <View style={styles.screen}>
      <Text>RecommendPostsTab</Text>
    </View>
  );
};

export default RecommendPostsTab;

const styles = ScaledSheet.create({
  screen: {},
});