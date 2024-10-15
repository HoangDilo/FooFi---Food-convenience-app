import {Pressable} from 'react-native';
import React, {useMemo} from 'react';
import {Route, TabBarItemProps} from 'react-native-tab-view';
import {ScaledSheet} from 'react-native-size-matters/extend';
import Typo from '../Typo';
import colorsConstant from '@/constants/colors.constant';

const OtherChefItemTabBar = ({
  route,
  navigationState,
}: TabBarItemProps<Route>) => {
  const isFocused = useMemo(
    () => navigationState.routes[navigationState.index].key === route.key,
    [navigationState.index, navigationState.routes, route.key],
  );

  // const isFocused = useMemo(() => navigationState.)

  return (
    <Pressable style={styles.tabItem}>
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
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: '16@s',
    fontWeight: '500',
  },
  titleFocused: {
    color: colorsConstant.primary,
  },
  titleUnfocused: {
    color: colorsConstant.black_2,
  },
});
