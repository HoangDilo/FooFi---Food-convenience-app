import {StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import colorsConstant from '@/constants/colors.constant';
import {useAppSelector} from '@/hooks/redux';
import MyProfile from './MyProfile';
import Authentication from './Authentication';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setCurrentRoute, setIsScrolling} from '@/store/reducers/system.reducer';
import {TAB} from '@/constants/tabs.constant';

const MyScreen = () => {
  const {access_token} = useAppSelector(state => state.my);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(setCurrentRoute(TAB.MY));
      dispatch(setIsScrolling(false));
    }, [dispatch]),
  );

  return (
    <View style={styles.screen}>
      {access_token ? <MyProfile /> : <Authentication />}
    </View>
  );
};

export default MyScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colorsConstant.background,
    flex: 1,
  },
  title: {},
});
