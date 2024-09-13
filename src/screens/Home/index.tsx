import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IconXML from '@/components/IconXML';
import HomeTab from '@/assets/icons/HomeTab';
import {deviceWidth} from '@/constants/device.constant';

const HomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.homeScreen}>
      <Image
        source={{
          uri: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
        }}
        style={styles.recommendFoodImage}
      />
      <View style={styles.mainContainer}></View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
  },
  recommendFoodImage: {
    width: deviceWidth,
    height: 300,
  },
  mainContainer: {
    backgroundColor: '#FFF',
    flex: 1,
  },
});
