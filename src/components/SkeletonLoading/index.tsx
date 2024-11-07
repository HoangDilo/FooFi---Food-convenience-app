import {StyleProp, ViewStyle} from 'react-native';
import React, {useEffect} from 'react';
import colorsConstant from '@/constants/colors.constant';
import {ScaledSheet} from 'react-native-size-matters/extend';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface ISkeletonLoadingWrapperProps {
  skeletonStyle?: StyleProp<ViewStyle>;
}

const SkeletonLoading = ({skeletonStyle}: ISkeletonLoadingWrapperProps) => {
  const colorValue = useSharedValue(0);

  const colorAnimated = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        colorValue.value,
        [0, 1],
        [colorsConstant.skeleton_3, colorsConstant.skeleton_2],
      ),
    };
  });

  useEffect(() => {
    colorValue.value = withRepeat(
      withTiming(1, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
      true,
    );
  }, []);

  return <Animated.View style={[skeletonStyle, colorAnimated]}></Animated.View>;
};

export default SkeletonLoading;

const styles = ScaledSheet.create({});
