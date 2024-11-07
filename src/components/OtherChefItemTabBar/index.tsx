import {Pressable} from 'react-native';
import React, {useMemo} from 'react';
import {Route, TabBarItemProps} from 'react-native-tab-view';
import {ScaledSheet} from 'react-native-size-matters/extend';
import Typo from '../Typo';
import colorsConstant from '@/constants/colors.constant';

interface OtherChefItemTabBarProps extends TabBarItemProps<Route> {
  initialWidth: number;
  onPressTab: (index: number) => void;
}

const OtherChefItemTabBar = ({
  route,
  navigationState,
  initialWidth,
  onPressTab,
}: OtherChefItemTabBarProps) => {
  const isFocused = useMemo(
    () => navigationState.routes[navigationState.index].key === route.key,
    [navigationState.index, navigationState.routes, route.key],
  );
  const currentIndex = useMemo(
    () => navigationState.routes.findIndex(item => item.key === route.key),
    [navigationState.routes, route.key],
  );

  return (
    <Pressable
      style={[
        styles.tabItem,
        {
          width: initialWidth,
        },
      ]}
      onPress={() => onPressTab(currentIndex)}>
      <Typo
        style={[
          isFocused ? styles.titleFocused : styles.titleUnfocused,
          styles.title,
        ]}>
        {route.title}
      </Typo>
    </Pressable>
  );
};

export default OtherChefItemTabBar;

const styles = ScaledSheet.create({
  tabItem: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: '12@s',
  },
  title: {
    fontSize: '18@s',
    fontWeight: '500',
  },
  titleFocused: {
    color: colorsConstant.primary,
  },
  titleUnfocused: {
    color: colorsConstant.black_2,
  },
});
