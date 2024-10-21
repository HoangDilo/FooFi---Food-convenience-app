import {View} from 'react-native';
import React, {memo} from 'react';
import {ScaledSheet} from 'react-native-size-matters/extend';
import Typo from '@/components/Typo';
import {IIngredient} from '@/types/kitchen.type';
import {useTranslation} from 'react-i18next';
import colorsConstant from '@/constants/colors.constant';
import ItemIngredientRequired from './ItemIngredientRequired';

interface IIngredientRequiredProps {
  listIngredients: IIngredient[];
}

const IngredientRequired = ({listIngredients}: IIngredientRequiredProps) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Typo style={styles.title}>
        {t('kitchen.kitchen_ingredient')} {t('required')}:
      </Typo>
      <View style={styles.listIngredient}>
        {listIngredients.map(item => (
          <ItemIngredientRequired
            ingredient={{...item, is_available: true}}
            key={item.id}
          />
        ))}
      </View>
    </View>
  );
};

export default memo(IngredientRequired);

const styles = ScaledSheet.create({
  container: {
    marginTop: '24@s',
  },
  title: {
    color: colorsConstant.black_1,
    fontWeight: '700',
    fontSize: '24@s',
    marginBottom: '12@s',
  },
  listIngredient: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: '24@s',
    rowGap: '8@s',
  },
});
