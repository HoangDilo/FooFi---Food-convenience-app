import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import RecommendSection from './Recommend';
import {getDaySession} from '@/utils/time';
import HomeSearch from './HomeSearch';
import DaySessionRecommend from './DaySessionRecommend';
import KitchenRecommend from './KitchenRecommend';

const HomeScreen = () => {
  useEffect(() => {
    getDaySession();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.homeScreen}
      overScrollMode="auto">
      <RecommendSection />
      <View style={styles.mainContainer}>
        <HomeSearch />
        <DaySessionRecommend />
        <KitchenRecommend />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeScreen: {
    backgroundColor: '#FFF',
    gap: 20,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 20,
  },
});
