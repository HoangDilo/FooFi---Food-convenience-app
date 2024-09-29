import {
  DimensionValue,
  Pressable,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {ScaledSheet} from 'react-native-size-matters/extend';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';

interface IBlackGardientWrapper {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  width?: DimensionValue;
  height?: DimensionValue;
  onPress?: () => void;
}

const BlackGradientWrapper = ({
  style,
  children,
  width = '100%',
  height,
  onPress,
}: IBlackGardientWrapper) => {
  return (
    <Pressable style={[style, styles.gradientContainer]} onPress={onPress}>
      {children}
      <View style={[styles.gradientWrapper, {width, height}]}>
        <Svg height={height?.toString()} style={{flex: 1}}>
          <Defs>
            <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#000" stopOpacity="0" />
              <Stop offset="100%" stopColor="#000" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
        </Svg>
      </View>
    </Pressable>
  );
};

export default BlackGradientWrapper;

const styles = ScaledSheet.create({
  gradientContainer: {
    position: 'relative',
  },
  gradientWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 1,
  },
});
