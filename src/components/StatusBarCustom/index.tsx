import {StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import {useAppSelector} from '@/hooks/redux';

const StatusBarCustom = () => {
  const {isScrolling} = useAppSelector(state => state.system);
  return (
    <StatusBar
      barStyle={isScrolling ? 'dark-content' : 'light-content'}
      backgroundColor={isScrolling ? '#FFF' : '#00000000'}
      animated
    />
  );
};

export default StatusBarCustom;

const styles = StyleSheet.create({});
