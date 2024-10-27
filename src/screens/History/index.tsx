import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import colorsConstant from '@/constants/colors.constant';
import HeaderStack from '@/components/HeaderStack';
import {RouteProp, useFocusEffect, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '@/types/navigation.type';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {setCurrentRoute, setIsScrolling} from '@/store/reducers/system.reducer';
import {STACK} from '@/constants/screens.constant';

const HistoryScreen = () => {
  const {params} = useRoute<RouteProp<RootStackParamList, 'history'>>();
  const {t} = useTranslation();
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(setIsScrolling(false));
      dispatch(setCurrentRoute(STACK.HISTORY));
    }, [dispatch]),
  );

  return (
    <View style={styles.screen}>
      <HeaderStack title={t(`my.${params.type}_history`)} />
      <Text>HistoryScreen</Text>
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colorsConstant.background,
  },
});
