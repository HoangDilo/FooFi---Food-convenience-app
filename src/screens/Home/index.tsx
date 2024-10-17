import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters/extend';
import Animated, {
  Easing,
  ReduceMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';

import RecommendSection from './Recommend';
import HomeSearch from './HomeSearch';
import DaySessionRecommend from './DaySessionRecommend';
import KitchenRecommend from './KitchenRecommend';
import {useAppSelector} from '@/hooks/redux';
import colorsConstant from '@/constants/colors.constant';
import MealOptions from '@/components/MealOptions';
import {useDispatch} from 'react-redux';
import {setIsBottomSheetShowing} from '@/store/reducers/system.reducer';
import RecommendPosts from './RecommendPosts';

const HomeScreen = () => {
  const {isBottomTabHidden} = useAppSelector(state => state.system);
  const dispatch = useDispatch();

  const [isBottomSheetShown, setIsBottomSheetShown] = useState(false);

  const bottomSheetSessionsRef = useRef<BottomSheet | null>(null);
  const snapPoints = useMemo(() => [200], []);

  const scrollViewRef = useRef<ScrollView | null>(null);

  const opacity = useSharedValue(1);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.5}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        style={{backgroundColor: 'black'}}
      />
    ),
    [],
  );

  const handleChangeBS = useCallback((index: number) => {
    dispatch(setIsBottomSheetShowing(index !== -1));
    setIsBottomSheetShown(index !== -1);
  }, []);

  const handleChooseOtherSession = useCallback(() => {
    dispatch(setIsBottomSheetShowing(true));
    setIsBottomSheetShown(true);
    bottomSheetSessionsRef.current?.expand();
    console.log(scrollViewRef.current);
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
        ref={scrollViewRef}
        contentContainerStyle={styles.homeScreen}
        overScrollMode="auto"
        showsVerticalScrollIndicator={false}>
        <RecommendSection />
        <View style={styles.mainContainerWrapper}>
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
            <RecommendPosts />
          </Animated.View>
        </View>
      </ScrollView>
      {isBottomSheetShown && (
        <View style={styles.bottomSheetContainer}>
          <BottomSheet
            ref={bottomSheetSessionsRef}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            animationConfigs={{
              duration: 200,
              easing: Easing.inOut(Easing.quad),
            }}
            handleIndicatorStyle={{backgroundColor: colorsConstant.secondary}}
            onChange={index => handleChangeBS(index)}
            style={styles.bottomSheetView}
            enablePanDownToClose>
            <MealOptions />
          </BottomSheet>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = ScaledSheet.create({
  homeScreen: {
    backgroundColor: colorsConstant.background,
  },
  mainContainerWrapper: {
    backgroundColor: colorsConstant.background,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    transform: [
      {
        translateY: -16,
      },
    ],
  },
  mainContainer: {
    flex: 1,
    paddingTop: '20@s',
    paddingHorizontal: '20@s',
    gap: '24@s',
  },
  bottomSheetContainer: {
    position: 'absolute',
    zIndex: 3,
    flex: 1,
    width: '100%',
    height: '100%',
  },
  bottomSheetView: {
    paddingHorizontal: '24@s',
    borderRadius: '20@s',
    overflow: 'hidden',
  },
});
