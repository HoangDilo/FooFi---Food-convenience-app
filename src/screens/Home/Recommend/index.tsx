import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {deviceWidth} from '@/constants/device.constant';
import {useTranslation} from 'react-i18next';
import Typo from '@/components/Typo';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';
import colorsConstant from '@/constants/colors.constant';

const RecommendSection = () => {
  const {t} = useTranslation();

  return (
    <View style={styles.wrapper}>
      <Image
        source={{
          uri: 'https://i-giadinh.vnecdn.net/2023/04/16/Buoc-11-Thanh-pham-11-7068-1681636164.jpg',
        }}
        style={styles.recommendFoodImage}
      />
      <View style={styles.floatingView}>
        <View style={styles.gradientWrapper}>
          <Svg height="200" width="100%" style={{flex: 1}}>
            <Defs>
              <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor="#FFF" stopOpacity="0" />
                <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
              </LinearGradient>
            </Defs>
            <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
          </Svg>
        </View>
        <View style={styles.textsWrapper}>
          <Typo style={styles.recommendLabel}>
            {t('home.recommend_for_you')}
          </Typo>
          <Typo style={styles.dishName}>Bún chả Hà Lội</Typo>
        </View>
      </View>
    </View>
  );
};

export default RecommendSection;

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  recommendFoodImage: {
    width: deviceWidth,
    height: 380,
  },
  floatingView: {
    position: 'absolute',
    bottom: 0,
  },
  textsWrapper: {
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  recommendLabel: {
    color: colorsConstant.primary,
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '400',
    fontStyle: 'italic',
  },
  dishName: {
    fontWeight: 700,
    fontSize: 32,
    lineHeight: 38,
    color: colorsConstant.primary,
    marginLeft: 8,
  },
  gradientWrapper: {
    width: deviceWidth,
    height: 200,
    position: 'absolute',
    bottom: 0,
  },
});
