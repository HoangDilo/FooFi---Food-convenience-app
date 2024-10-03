import React from 'react';
import {StatusBar} from 'react-native';
import {useAppSelector} from '@/hooks/redux';
import {TAB} from '@/constants/tabs.constant';

const StatusBarCustom = () => {
  const {isScrolling, currentRoute} = useAppSelector(state => state.system);

  return (
    <StatusBar
      barStyle={
        !isScrolling && currentRoute === TAB.HOME_TAB
          ? 'light-content'
          : 'dark-content'
      }
      backgroundColor={
        isScrolling && currentRoute === TAB.HOME_TAB ? '#FFF' : '#00000000'
      }
      animated={currentRoute === TAB.HOME_TAB}
    />
  );
};

export default StatusBarCustom;
