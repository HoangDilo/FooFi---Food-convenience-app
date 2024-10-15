import {FlatList, Text, View} from 'react-native';
import React from 'react';
import {ScaledSheet} from 'react-native-size-matters/extend';

const listPostFake = [];

const AllPostsTab = () => {
  console.log('all');

  return (
    <View style={styles.mainScreen}>
      <Text>AllPostsTab</Text>
    </View>
  );
};

export default AllPostsTab;

const styles = ScaledSheet.create({
  mainScreen: {
    flex: 1,
    paddingTop: '20@s',
    paddingHorizontal: '20@s',
  },
});
