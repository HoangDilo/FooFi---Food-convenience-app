import {StyleSheet, View} from 'react-native';
import React from 'react';
import Typo from '@/components/Typo';
import {SafeAreaView} from 'react-native-safe-area-context';
import colorsConstant from '@/constants/colors.constant';
import HeaderTab from '@/components/HeaderTab';
import StatusBarCustom from '@/components/StatusBarCustom';

const KitchenScreen = () => {
  return (
    <SafeAreaView
      edges={['top']}
      style={{flex: 1, backgroundColor: colorsConstant.background}}>
      <StatusBarCustom />
      <HeaderTab />
      <View style={styles.kitchenScreen}>
        <Typo>HEHEHEHE</Typo>
      </View>
    </SafeAreaView>
  );
};

export default KitchenScreen;

const styles = StyleSheet.create({
  kitchenScreen: {
    flex: 1,
    backgroundColor: colorsConstant.background,
  },
});
