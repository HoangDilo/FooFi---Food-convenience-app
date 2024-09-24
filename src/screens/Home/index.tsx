import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters/extend';
import Animated, {
  Easing,
  ReduceMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import RecommendSection from './Recommend';
import HomeSearch from './HomeSearch';
import DaySessionRecommend from './DaySessionRecommend';
import KitchenRecommend from './KitchenRecommend';
import {useAppSelector} from '@/hooks/redux';

const HomeScreen = () => {
  const {isBottomTabHidden} = useAppSelector(state => state.system);

  const opacity = useSharedValue(1);

  useEffect(() => {
    if (isBottomTabHidden) {
      opacity.value = withTiming(0, {
        duration: 1000,
        easing: Easing.inOut(Easing.quad),
      });
    } else {
      opacity.value = 1;
    }
  }, [isBottomTabHidden]);

  return (
    <ScrollView
      contentContainerStyle={styles.homeScreen}
      overScrollMode="auto"
      showsVerticalScrollIndicator={false}>
      <RecommendSection />
      <Animated.View
        style={[
          styles.mainContainer,
          {
            opacity,
          },
        ]}>
        <HomeSearch />
        <DaySessionRecommend />
        <KitchenRecommend />
      </Animated.View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = ScaledSheet.create({
  homeScreen: {
    backgroundColor: '#FFF',
    gap: '20@s',
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: '20@s',
    gap: '20@s',
  },
});
