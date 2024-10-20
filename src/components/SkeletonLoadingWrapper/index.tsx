import {StyleProp, View, ViewStyle} from 'react-native';
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
  isLoading: boolean;
  children: React.ReactNode;
  skeletonStyle?: StyleProp<ViewStyle>;
}

const SkeletonLoadingWrapper = ({
  isLoading,
  children,
  skeletonStyle,
}: ISkeletonLoadingWrapperProps) => {
  const colorValue = useSharedValue(0);

  const colorAnimated = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        colorValue.value,
        [0, 1],
        [colorsConstant.skeleton_1, colorsConstant.skeleton_2],
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

  return (
    <View style={styles.wrapper}>
      {children}
      {isLoading && (
        <Animated.View
          style={[
            styles.skeleton,
            skeletonStyle,
            colorAnimated,
          ]}></Animated.View>
      )}
    </View>
  );
};

export default SkeletonLoadingWrapper;

const styles = ScaledSheet.create({
  wrapper: {
    position: 'relative',
  },
  skeleton: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 2,
    top: 0,
    left: 0,
  },
});
