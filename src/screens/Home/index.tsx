import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {deviceWidth} from '@/constants/device.constant';
import RecommendSection from './Recommend';

const HomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.homeScreen}>
      <RecommendSection />
      <View style={styles.mainContainer}></View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
  },
  mainContainer: {
    backgroundColor: '#FFF',
    flex: 1,
  },
});
