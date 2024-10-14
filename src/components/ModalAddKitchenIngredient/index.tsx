import {View} from 'react-native';
import React from 'react';
import {ScaledSheet} from 'react-native-size-matters/extend';
import ModalRemake from '../ModalRemake';

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
    padding
  },
});
