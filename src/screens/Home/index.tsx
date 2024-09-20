import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import RecommendSection from './Recommend';
import DaySessionRecommend from './DaySessionRecommend';
import {getDaySession} from '@/utils/time';

const HomeScreen = () => {
  useEffect(() => {
    getDaySession();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.homeScreen}>
      <RecommendSection />
      <View style={styles.mainContainer}>
        <DaySessionRecommend />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    backgroundColor: '#FFF',
    gap: 12,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
