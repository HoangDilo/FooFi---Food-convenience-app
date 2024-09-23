import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import RecommendSection from './Recommend';
import DaySessionRecommend from './DaySessionRecommend';
import {getDaySession} from '@/utils/time';
import HomeSearch from './HomeSearch';

const HomeScreen = () => {
  useEffect(() => {
    getDaySession();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.homeScreen}>
      <RecommendSection />
      <View style={styles.mainContainer}>
        <HomeSearch />
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
    gap: 20,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 20,
  },
});
