import React, {memo} from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import Animated from 'react-native-reanimated';
import {ScaledSheet} from 'react-native-size-matters/extend';
import colorsConstant from '@/constants/colors.constant';
import CustomItemTab from '../CustomItemTab';

const CustomBottomTab = memo(
  ({state, descriptors, navigation}: BottomTabBarProps) => {
    return (
      <Animated.View style={styles.tabBarContainer}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          console.log(options);

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
      </Animated.View>
    );
  },
);

export default CustomBottomTab;

const styles = ScaledSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    backgroundColor: 'white',
    borderTopColor: colorsConstant.gray_3,
    height: 80,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
});
