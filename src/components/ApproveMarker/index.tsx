import React, {useEffect} from 'react';
import {ScaledSheet} from 'react-native-size-matters/extend';
import colorsConstant from '@/constants/colors.constant';
import Typo from '../Typo';
import {useTranslation} from 'react-i18next';
import Animated, {
  Easing,
  interpolate,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const ApproveMarker = () => {
  const {t} = useTranslation();

  const animation = useSharedValue(0);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(animation.value, [0, 1], [4, 0]),
        },
        {
          translateY: interpolate(animation.value, [0, 1], [-3, 0]),
        },
        {
          scale: interpolate(animation.value, [0, 1], [1.5, 1]),
        },
      ],
    };
  });

  useEffect(() => {
    opacity.value = withDelay(
      500,
      withTiming(1, {
        duration: 0,
        reduceMotion: ReduceMotion.System,
      }),
    );
    animation.value = withDelay(
      500,
      withTiming(1, {
        duration: 200,
        easing: Easing.bezier(0.55, 0, 1, 0.45),
        reduceMotion: ReduceMotion.System,
      }),
    );
  }, [animation, opacity]);

  return (
    <Animated.View style={[styles.approve, animatedStyle, {opacity}]}>
      <Typo style={styles.label}>{t('approved')}</Typo>
    </Animated.View>
  );
};

export default ApproveMarker;

const styles = ScaledSheet.create({
  approve: {
    borderWidth: '4@s',
    borderColor: colorsConstant.approved,
    paddingHorizontal: '6@s',
    paddingVertical: '4@s',
    position: 'absolute',
    top: '48@vs',
    right: '12@s',
    zIndex: 3,
  },
  label: {
    fontWeight: '700',
    fontSize: '16@s',
    color: colorsConstant.approved,
  },
});
