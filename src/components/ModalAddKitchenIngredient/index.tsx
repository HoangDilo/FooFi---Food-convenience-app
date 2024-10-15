import {View} from 'react-native';
import React from 'react';
import {ScaledSheet} from 'react-native-size-matters/extend';
import ModalRemake from '../ModalRemake';
import colorsConstant from '@/constants/colors.constant';

interface IModalAddKitchenIngredientProps {
  isVisible: boolean;
}

const ModalAddKitchenIngredient = ({
  isVisible,
}: IModalAddKitchenIngredientProps) => {
  return (
    <ModalRemake isVisible={isVisible}>
      <View style={styles.mainContainer}></View>
    </ModalRemake>
  );
};

export default ModalAddKitchenIngredient;

const styles = ScaledSheet.create({
  mainContainer: {
    backgroundColor: colorsConstant.background,
    padding: '24@s',
    borderRadius: '10@s',
    gap: '12@s',
  },
});
