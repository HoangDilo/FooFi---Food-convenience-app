import {View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {IIngredient} from '@/types/kitchen.type';
import {useTranslation} from 'react-i18next';
import Typo from '@/components/Typo';
import {ScaledSheet} from 'react-native-size-matters/extend';
import colorsConstant from '@/constants/colors.constant';

interface IItemIngredientDisplayProps {
  ingredient: IIngredient;
}

const ItemIngredientDisplay = ({ingredient}: IItemIngredientDisplayProps) => {
  const {i18n} = useTranslation();

  return (
    <View style={styles.itemContainer}>
      <View style={styles.leftContainer}>
        <FastImage source={{uri: ingredient.img_url}} />
        <View style={styles.ingredientInfo}>
          <Typo style={styles.ingredientName}>
            {ingredient[`name_${i18n.language}` as keyof IIngredient]}
          </Typo>
          <Typo style={styles.ingredientAmount}>
            {ingredient.quantity} {ingredient.unit}
          </Typo>
        </View>
      </View>
    </View>
  );
};

export default ItemIngredientDisplay;

const styles = ScaledSheet.create({
  itemContainer: {
    flexDirection: 'row',
    borderRadius: '8@s',
  },
  leftContainer: {},
  ingredientInfo: {
    gap: '4@s',
  },
  ingredientName: {
    fontSize: '14@s',
    fontWeight: '500',
    color: colorsConstant.black_2,
  },
  ingredientAmount: {
    fontSize: '12@s',
    font
  }
});
