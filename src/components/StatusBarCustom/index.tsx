import React from 'react';
import {StatusBar} from 'react-native';
import {useAppSelector} from '@/hooks/redux';

const StatusBarCustom = () => {
  const {isScrolling} = useAppSelector(state => state.system);

  return (
    <StatusBar
      barStyle={!isScrolling ? 'light-content' : 'dark-content'}
      backgroundColor={isScrolling ? '#FFF' : '#00000000'}
      animated
    />
  );
};

export default StatusBarCustom;
