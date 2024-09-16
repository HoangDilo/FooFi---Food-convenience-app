import {Image, Pressable, StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import {deviceWidth} from '@/constants/device.constant';
import {useTranslation} from 'react-i18next';
import Typo from '@/components/Typo';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';
import colorsConstant from '@/constants/colors.constant';
import IconXML from '@/components/IconXML';
import ChevronRight from '@/assets/icons/ChevronRight';
import {useNavigation} from '@react-navigation/native';

const RecommendSection = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const handlePress = useCallback(() => {
    navigation.navigate('my', {
      id: 12,
    });
  }, []);

  return (
    <Pressable style={styles.wrapper} onPress={handlePress}>
      <Image
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
          <Typo style={styles.recommendLabel}>
            {t('home.recommend_for_you')}
          </Typo>
          <View style={styles.dishNameWrapper}>
            <IconXML icon={ChevronRight} height={24} width={24} />
            <Typo style={styles.dishName}>Bún chả Hà Lội</Typo>
          </View>
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
    color: colorsConstant.primary,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
    fontStyle: 'italic',
  },
  dishName: {
    fontWeight: 700,
    fontSize: 32,
    lineHeight: 40,
    color: colorsConstant.primary,
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
