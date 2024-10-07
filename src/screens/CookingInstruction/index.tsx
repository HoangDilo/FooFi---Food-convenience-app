import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setIsBottomTabHidden} from '@/store/reducers/system.reducer';

const CookingInstruction = () => {
  const dispatch = useDispatch();
  return (
    <View>
      <Text>CookingInstruction</Text>
    </View>
  );
};

export default CookingInstruction;

const styles = StyleSheet.create({});
