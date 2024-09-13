import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAppSelector} from '@/hooks/redux';

const StatusBarCustom = () => {
  const {isScrolling} = useAppSelector(state => state.system);
  console.log(isScrolling);

  return (
    <StatusBar
      barStyle={isScrolling ? 'dark-content' : 'light-content'}
      backgroundColor={'#00000000'}
    />
  );
};

export default StatusBarCustom;

const styles = StyleSheet.create({});
