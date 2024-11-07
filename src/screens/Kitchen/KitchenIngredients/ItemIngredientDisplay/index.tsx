import {Pressable, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {IIngredient} from '@/types/kitchen.type';
import {useTranslation} from 'react-i18next';
import Typo from '@/components/Typo';
import {scale, ScaledSheet} from 'react-native-size-matters/extend';
import colorsConstant from '@/constants/colors.constant';
import IconXML from '@/components/IconXML';
import EditBlack2 from '@/assets/icons/EditBlack2';
import TrashCanRed from '@/assets/icons/TrashCanRed';

interface IItemIngredientDisplayProps {
  ingredient: IIngredient;
  onChooseEdit: () => void;
  onChooseDelete: () => void;
}

const ItemIngredientDisplay = ({
  ingredient,
  onChooseEdit,
  onChooseDelete,
}: IItemIngredientDisplayProps) => {
  const {t, i18n} = useTranslation();

  return (
    <View style={styles.itemContainer}>
      <View style={styles.leftContainer}>
        <FastImage source={{uri: ingredient.img_url}} style={styles.image} />
        <View style={styles.ingredientInfo}>
          <Typo style={styles.ingredientName}>
            {ingredient[`name_${i18n.language}` as keyof IIngredient]}
          </Typo>
          {ingredient.unit ? (
            <Typo style={styles.ingredientAmount}>
              {ingredient.quantity} {ingredient.unit}
            </Typo>
          ) : (
            <Typo style={styles.ingredientAmount}>
              {t('kitchen.quantity')}: {ingredient.quantity}
            </Typo>
          )}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.buttonWrapper} onPress={onChooseEdit}>
          <IconXML icon={EditBlack2} width={scale(20)} height={scale(20)} />
        </Pressable>
        <IconXML
          icon={TrashCanRed}
          width={scale(24)}
          height={scale(24)}
          onPress={onChooseDelete}
        />
      </View>
    </View>
  );
};

export default ItemIngredientDisplay;

const styles = ScaledSheet.create({
  itemContainer: {
    flexDirection: 'row',
    borderRadius: '12@s',
    backgroundColor: '#FFF',
    shadowColor: colorsConstant.shadow_2,
    elevation: 4,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    paddingLeft: '8@s',
    paddingRight: '12@s',
    paddingVertical: '8@s',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    gap: '12@s',
  },
  ingredientName: {
    fontSize: '14@s',
    fontWeight: '500',
    color: colorsConstant.black_2,
  },
  ingredientAmount: {
    fontSize: '12@s',
    color: colorsConstant.gray_1,
  },
  image: {
    width: '40@s',
    height: '40@s',
    borderRadius: '8@s',
  },
  ingredientInfo: {},
  buttonContainer: {
    flexDirection: 'row',
    gap: '8@s',
  },
  buttonWrapper: {
    padding: '4@s',
  },
});
