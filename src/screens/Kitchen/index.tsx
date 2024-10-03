import {StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import Typo from '@/components/Typo';
import colorsConstant from '@/constants/colors.constant';
import HeaderTab from '@/components/HeaderTab';
import {setCurrentRoute} from '@/store/reducers/system.reducer';
import {TAB} from '@/constants/tabs.constant';

const KitchenScreen = () => {
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(setCurrentRoute(TAB.KITCHEN));
    }, [dispatch]),
  );

  return (
    <SafeAreaView
      edges={['top']}
      style={{flex: 1, backgroundColor: colorsConstant.background}}>
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
