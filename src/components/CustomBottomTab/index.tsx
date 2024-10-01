import React, {useEffect} from 'react';
import {View} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import Animated, {
  Easing,
  ReduceMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppSelector} from '@/hooks/redux';
import {ScaledSheet} from 'react-native-size-matters/extend';

import colorsConstant from '@/constants/colors.constant';
import CustomItemTab from '../CustomItemTab';

const CustomBottomTab = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const {isBottomTabHidden, isBottomSheetShowing} = useAppSelector(
    state => state.system,
  );
  const insets = useSafeAreaInsets();

  const height = useSharedValue(80);

  useEffect(() => {
    if (isBottomTabHidden) {
      height.value = withTiming(0, {
        duration: 500,
        easing: Easing.inOut(Easing.quad),
      });
    } else {
      height.value = 80;
    }
  }, [height, isBottomTabHidden]);

  useEffect(() => {
    if (!isBottomSheetShowing) {
      height.value = withTiming(80, {
        duration: 300,
        easing: Easing.inOut(Easing.quad),
        reduceMotion: ReduceMotion.System,
      });
    } else {
      height.value = 0;
    }
  }, [height, isBottomSheetShowing]);

  return (
    <Animated.View
      style={[styles.tabBarContainer, {height, paddingBottom: insets.bottom}]}>
      <View style={styles.paddingTop}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <CustomItemTab
              key={index}
              isFocused={isFocused}
              label={label.toString()}
              options={options}
              onPress={onPress}
              onLongPress={onLongPress}
            />
          );
        })}
      </View>
    </Animated.View>
  );
};

export default CustomBottomTab;

const styles = ScaledSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    backgroundColor: 'white',
    borderTopColor: colorsConstant.gray_3,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
  paddingTop: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: '8@s',
  },
});
