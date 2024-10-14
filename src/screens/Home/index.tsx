import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters/extend';
import {useAppSelector} from '@/hooks/redux';
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';

import {TAB} from '@/constants/tabs.constant';
import colorsConstant from '@/constants/colors.constant';
import MealOptions from '@/components/MealOptions';

import {
  setCurrentRoute,
  setIsBottomSheetShowing,
  setIsScrolling,
} from '@/store/reducers/system.reducer';
import {getDaySession} from '@/utils/time';

import RecommendPosts from './RecommendPosts';
import RecommendSection from './Recommend';
import HomeSearch from './HomeSearch';
import DaySessionRecommend from './DaySessionRecommend';
import KitchenRecommend from './KitchenRecommend';

const HomeScreen = () => {
  const {isBottomTabHidden} = useAppSelector(state => state.system);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const [isBottomSheetShown, setIsBottomSheetShown] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [activeSession, setActiveSession] = useState<string>(getDaySession());

  const bottomSheetSessionsRef = useRef<BottomSheet | null>(null);
  const scrollViewRef = useRef<ScrollView | null>(null);
  const snapPoints = useMemo(() => [160 + insets.bottom], [insets.bottom]);

  const opacity = useSharedValue(1);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.2}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        style={{backgroundColor: 'black'}}
      />
    ),
    [],
  );

  const handleChangeBS = useCallback(
    (index: number) => {
      dispatch(setIsBottomSheetShowing(index !== -1));
      setIsBottomSheetShown(index !== -1);
    },
    [dispatch],
  );

  const handleChooseOtherSession = useCallback(() => {
    if (!isBottomSheetShown) {
      dispatch(setIsBottomSheetShowing(true));
      setIsBottomSheetShown(true);
      bottomSheetSessionsRef.current?.expand();
    }
  }, [dispatch, isBottomSheetShown]);

  const handleRefreshHome = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  const handleScrollHome = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (event.nativeEvent.contentOffset.y > 200) {
        dispatch(setIsScrolling(true));
      } else {
        dispatch(setIsScrolling(false));
      }
    },
    [dispatch],
  );

  const handleChangeActiveMeal = useCallback((sessionName: string) => {
    setActiveSession(sessionName);
    bottomSheetSessionsRef.current?.close();
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
  }, [isBottomTabHidden, opacity]);

  useFocusEffect(
    useCallback(() => {
      scrollViewRef.current?.scrollTo({y: 0, animated: true});
      dispatch(setCurrentRoute(TAB.HOME_TAB));
    }, [dispatch]),
  );

  return (
    <View style={{flex: 1}}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.homeScreen}
        scrollToOverflowEnabled={false}
        refreshControl={
          <RefreshControl
            colors={[colorsConstant.primary]}
            progressViewOffset={12}
            refreshing={refreshing}
            onRefresh={handleRefreshHome}
          />
        }
        showsVerticalScrollIndicator={false}
        onScroll={handleScrollHome}
        keyboardShouldPersistTaps="handled">
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
              option={activeSession}
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
            containerHeight={136}
            enablePanDownToClose>
            <MealOptions
              activeSession={activeSession}
              onChangeActiveMeal={handleChangeActiveMeal}
            />
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
