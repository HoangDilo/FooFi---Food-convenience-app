import {ScrollView, View} from 'react-native';
import React, {useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import colorsConstant from '@/constants/colors.constant';
import HeaderTab from '@/components/HeaderTab';
import {setCurrentRoute} from '@/store/reducers/system.reducer';
import {TAB} from '@/constants/tabs.constant';
import {ScaledSheet} from 'react-native-size-matters/extend';
import KitchenTools from './KitchenTools';

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
      style={{flex: 1, backgroundColor: colorsConstant.primary}}>
      <HeaderTab />
      {/* <ScrollView> */}
      <View style={styles.kitchenScreen}>
        <KitchenTools />
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default KitchenScreen;

const styles = ScaledSheet.create({
  kitchenScreen: {
    flex: 1,
    backgroundColor: colorsConstant.background,
    paddingHorizontal: '24@s',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});
