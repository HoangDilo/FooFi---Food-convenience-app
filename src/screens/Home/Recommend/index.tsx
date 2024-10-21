import React, {memo, useCallback, useRef} from 'react';
import {Animated, Easing, Pressable, View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';
import FastImage from 'react-native-fast-image';
import {scale, ScaledSheet} from 'react-native-size-matters/extend';
import {useAppDispatch} from '@/hooks/redux';

import {deviceWidth} from '@/constants/device.constant';

import {setIsBottomTabHidden} from '@/store/reducers/system.reducer';

import IconXML from '@/components/IconXML';
import ChevronRight from '@/assets/icons/ChevronRightWhite';
import Typo from '@/components/Typo';
import DotWhite from '@/assets/icons/DotWhite';

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
      navigation.navigate('dish_details', {
        post_id: 1,
        is_standard: true,
        dish_info: {
          img_url:
            'https://i-giadinh.vnecdn.net/2023/04/16/Buoc-11-Thanh-pham-11-7068-1681636164.jpg',
          name: 'Bún chả Hà Lội',
          duration: 40,
        },
      });
    });
  }, [changeDetail, dispatch, navigation]);

  useFocusEffect(
    useCallback(() => {
      changeDetail.setValue(1);
      dispatch(setIsBottomTabHidden(false));
    }, [changeDetail, dispatch]),
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
            <View style={styles.dishInfoTexts}>
              <Typo style={styles.dishName}>Bún chả Hà Lội</Typo>
              <IconXML icon={DotWhite} width={scale(6)} height={scale(6)} />
              <Typo style={styles.dishDuration}>40 phút</Typo>
            </View>
          </Animated.View>
        </View>
      </View>
    </Pressable>
  );
};

export default memo(RecommendSection);

const styles = ScaledSheet.create({
  wrapper: {
    position: 'relative',
  },
  recommendFoodImage: {
    width: deviceWidth,
    height: '320@s',
  },
  floatingView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flex: 1,
  },
  textsWrapper: {
    paddingHorizontal: '12@s',
    marginBottom: '28@s',
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
    fontSize: '28@s',
    lineHeight: '40@s',
    color: '#FFF',
    marginLeft: 8,
  },
  dishDuration: {
    fontSize: '20@s',
    color: '#FFF',
    fontWeight: '500',
  },
  dishInfoTexts: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '12@s',
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
