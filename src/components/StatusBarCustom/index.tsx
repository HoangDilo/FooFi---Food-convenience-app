import React, {useMemo} from 'react';
import {StatusBar} from 'react-native';
import {useAppSelector} from '@/hooks/redux';
import {TAB} from '@/constants/tabs.constant';
import colorsConstant from '@/constants/colors.constant';
import {STACK} from '@/constants/screens.constant';

const StatusBarCustom = () => {
  const {isScrolling, currentRoute} = useAppSelector(state => state.system);

  const isDarkContent = useMemo(
    () => currentRoute === TAB.OTHER_CHEFS || currentRoute === STACK.HISTORY,
    [currentRoute],
  );

  const isAnimated = useMemo(() => {
    return currentRoute === TAB.HOME_TAB || currentRoute === TAB.KITCHEN;
  }, [currentRoute]);

  return (
    <StatusBar
      barStyle={isScrolling || isDarkContent ? 'dark-content' : 'light-content'}
      backgroundColor={isScrolling ? colorsConstant.background : '#00000000'}
      animated={isAnimated}
    />
  );
};

export default StatusBarCustom;
