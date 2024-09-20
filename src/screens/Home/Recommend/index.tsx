import {Animated, Easing, Pressable, StyleSheet, View} from 'react-native';
import React, {useCallback, useRef} from 'react';
import {deviceWidth} from '@/constants/device.constant';
import {useTranslation} from 'react-i18next';
import Typo from '@/components/Typo';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';
import IconXML from '@/components/IconXML';
import ChevronRight from '@/assets/icons/ChevronRightWhite';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '@/hooks/redux';
import {setIsBottomTabHidden} from '@/store/reducers/system.reducer';
import FastImage from 'react-native-fast-image';

const RecommendSection = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const changeDetail = useRef(new Animated.Value(1)).current;

  const handlePress = useCallback(() => {
    dispatch(setIsBottomTabHidden(true));
    Animated.timing(changeDetail, {
      toValue: 0,
      duration: 1000,
      easing: Easing.bezier(0.65, 0, 0.35, 1),
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate('instruction', {
        dish_id: 1,
      });
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      changeDetail.setValue(1);
      dispatch(setIsBottomTabHidden(false));
    }, []),
  );

  return (
    <Pressable style={styles.wrapper} onPress={handlePress}>
      <FastImage
        source={{
          uri: 'https://i-giadinh.vnecdn.net/2023/04/16/Buoc-11-Thanh-pham-11-7068-1681636164.jpg',
        }}
        style={styles.recommendFoodImage}
      />
      <View style={styles.floatingView}>
        <View style={styles.gradientWrapper}>
          <Svg height="140" width="100%" style={{flex: 1}}>
            <Defs>
              <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor="#000" stopOpacity="0" />
                <Stop offset="100%" stopColor="#000" stopOpacity="1" />
              </LinearGradient>
            </Defs>
            <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
          </Svg>
        </View>
        <View style={styles.textsWrapper}>
          <Animated.View
            style={{
              opacity: changeDetail,
              transform: [
                {
                  translateY: changeDetail.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-20, 0],
                  }),
                },
              ],
            }}>
            <Typo style={styles.recommendLabel}>
              {t('home.recommend_for_you')}
            </Typo>
          </Animated.View>
          <Animated.View
            style={[
              styles.dishNameWrapper,
              {
                opacity: changeDetail,
                transform: [
                  {
                    translateX: changeDetail.interpolate({
                      inputRange: [0, 1],
                      outputRange: [100, 0],
                    }),
                  },
                ],
              },
            ]}>
            <IconXML icon={ChevronRight} height={24} width={24} />
            <Typo style={styles.dishName}>Bún chả Hà Lội</Typo>
          </Animated.View>
        </View>
      </View>
    </Pressable>
  );
};

export default RecommendSection;

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  recommendFoodImage: {
    width: deviceWidth,
    height: 320,
  },
  floatingView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flex: 1,
  },
  textsWrapper: {
    paddingHorizontal: 12,
    marginBottom: 12,
    flex: 1,
    zIndex: 1,
  },
  recommendLabel: {
    color: '#FFF',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
    fontStyle: 'italic',
  },
  dishName: {
    fontWeight: 700,
    fontSize: 32,
    lineHeight: 40,
    color: '#FFF',
    marginLeft: 8,
  },
  dishNameWrapper: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginTop: 4,
  },
  gradientWrapper: {
    width: deviceWidth,
    height: 140,
    position: 'absolute',
    bottom: 0,
    zIndex: 0,
  },
});
