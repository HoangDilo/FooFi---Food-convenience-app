import React, {useCallback, useEffect, useRef} from 'react';
import {ScrollView, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters/extend';
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';

import RecommendSection from './Recommend';
import HomeSearch from './HomeSearch';
import DaySessionRecommend from './DaySessionRecommend';
import KitchenRecommend from './KitchenRecommend';
import {useAppSelector} from '@/hooks/redux';
import Typo from '@/components/Typo';

const HomeScreen = () => {
  const {isBottomTabHidden} = useAppSelector(state => state.system);
  const bottomSheetSessionsRef = useRef<BottomSheet | null>(null);

  const opacity = useSharedValue(1);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.5}
        appearsOnIndex={0}
        style={{backgroundColor: 'red'}}
        onPress={() => console.log(123)}
      />
    ),
    [],
  );

  const handleChooseOtherSession = useCallback(() => {
    bottomSheetSessionsRef.current?.expand({
      duration: 300,
      easing: Easing.inOut(Easing.quad),
    });
  }, []);

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
    <View style={{flex: 1}}>
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
          <DaySessionRecommend
            onChooseOtherOptions={handleChooseOtherSession}
          />
          <KitchenRecommend />
        </Animated.View>
      </ScrollView>
      <BottomSheet
        snapPoints={[200]}
        enablePanDownToClose
        ref={bottomSheetSessionsRef}
        style={styles.sessionOptionsSheet}
        backdropComponent={renderBackdrop}>
        <Typo>A</Typo>
      </BottomSheet>
    </View>
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
    gap: '24@s',
  },
  sessionOptionsSheet: {
    borderRadius: '16@s',
  },
});
