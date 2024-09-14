import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {deviceWidth} from '@/constants/device.constant';
import {useTranslation} from 'react-i18next';

const RecommendSection = () => {
  const {t} = useTranslation();

  return (
    <View style={styles.wrapper}>
      <Image
        source={{
          uri: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
        }}
        style={styles.recommendFoodImage}
      />
      <View style={styles.floatingView}>
        <Text style={styles.recommendLabel}>{t('home.recommend_for_you')}a</Text>
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
  recommendLabel: {
    color: '#FFF',
    fontSize: 32,
    fontFamily: 'Inter-Bold',
  },
});
