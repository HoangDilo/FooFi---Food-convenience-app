import {Pressable} from 'react-native';
import React, {useCallback} from 'react';
import {ScaledSheet} from 'react-native-size-matters/extend';
import FastImage from 'react-native-fast-image';
import Typo from '@/components/Typo';
import {IIngredient} from '@/types/kitchen.type';
import {useTranslation} from 'react-i18next';
import colorsConstant from '@/constants/colors.constant';

interface IItemIngredientSelectProps {
  ingredient: IIngredient;
  isActive?: boolean;
  onSelectIngredient: () => void;
  onUnselectIngredient: () => void;
}

const ItemIngredientSelect = ({
  ingredient,
  isActive = false,
  onSelectIngredient,
  onUnselectIngredient,
}: IItemIngredientSelectProps) => {
  const {i18n} = useTranslation();

  const handlePressItem = useCallback(() => {
    isActive ? onUnselectIngredient() : onSelectIngredient();
  }, [isActive, onSelectIngredient, onUnselectIngredient]);

  return (
    <Pressable
      style={[styles.toolItem, isActive && styles.selected]}
      onPress={handlePressItem}>
      <FastImage source={{uri: ingredient.img_url}} style={styles.toolImg} />
      <Typo style={isActive ? styles.selectedName : styles.toolName}>
        {ingredient[`name_${i18n.language}` as keyof IIngredient]}
      </Typo>
    </Pressable>
  );
};

export default ItemIngredientSelect;

const styles = ScaledSheet.create({
  toolImg: {
    width: '32@s',
    height: '32@s',
    borderRadius: 999,
  },
  selected: {
    borderWidth: '1@s',
    borderColor: colorsConstant.primary,
  },
  toolItem: {
    flexDirection: 'row',
    borderRadius: 999,
    gap: '6@s',
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingVertical: '6@s',
    paddingLeft: '6@s',
    paddingRight: '12@s',
    shadowColor: colorsConstant.shadow_2,
    elevation: 4,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    borderWidth: '1@s',
    borderColor: '#FFF',
  },
  toolName: {
    color: colorsConstant.gray_1,
  },
  selectedName: {
    color: colorsConstant.primary,
  },
});
