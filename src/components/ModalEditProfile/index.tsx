import {View} from 'react-native';
import React from 'react';
import ModalRemake from '../ModalRemake';
import {ScaledSheet} from 'react-native-size-matters/extend';
import colorsConstant from '@/constants/colors.constant';
import FastImage from 'react-native-fast-image';
import { useAppSelector } from '@/hooks/redux';

interface IModalRemake {
  isVisible: boolean;
}

const ModalEditProfile = ({isVisible}: IModalRemake) => {
  const {user_info} = useAppSelector(state => state.my);

  return (
    <ModalRemake isVisible={isVisible}>
      <View style={styles.container}>
        <FastImage />
      </View>
    </ModalRemake>
  );
};

export default ModalEditProfile;

const styles = ScaledSheet.create({
  container: {
    borderRadius: '16@s',
    padding: '20@s',
    backgroundColor: colorsConstant.background,
  },
});
