import {View} from 'react-native';
import React from 'react';
import {IIngredient} from '@/types/kitchen.type';
import Typo from '@/components/Typo';
import {useTranslation} from 'react-i18next';
import colorsConstant from '@/constants/colors.constant';
import IconXML from '@/components/IconXML';
import CheckCircleGreen from '@/assets/icons/CheckCircleGreen';
import XCircleRed from '@/assets/icons/XCircleRed';
import {scale, ScaledSheet} from 'react-native-size-matters/extend';
import {deviceWidth} from '@/constants/device.constant';

interface IIngredientCheck extends IIngredient {
  is_available: boolean;
}

interface Props {
  ingredient: IIngredientCheck;
}

const ItemIngredientRequired = ({ingredient}: Props) => {
  const {i18n} = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <IconXML
          icon={ingredient.is_available ? CheckCircleGreen : XCircleRed}
          width={scale(20)}
          height={scale(20)}
        />
        <View style={styles.info}>
          <Typo style={styles.name}>
            {ingredient[`name_${i18n.language}` as keyof IIngredient]}:
          </Typo>
          <Typo style={styles.quantity}>
            {ingredient.quantity} {ingredient.unit}
          </Typo>
        </View>
      </View>
    </View>
  );
};

export default ItemIngredientRequired;

const styles = ScaledSheet.create({
  container: {
    width: scale(deviceWidth - 60),
  },
  item: {
    flexDirection: 'row',
    gap: '8@s',
    alignItems: 'center',
    shadowColor: colorsConstant.shadow_2,
    borderRadius: 999,
    paddingHorizontal: '12@s',
    marginBottom: '6@s',
  },
  info: {
    flexDirection: 'row',
    gap: '8@s',
    alignItems: 'center',
  },
  name: {
    fontSize: '16@s',
    color: colorsConstant.black_1,
    fontWeight: '500',
  },
  quantity: {
    fontSize: '14@s',
    color: colorsConstant.black_2,
  },
});
