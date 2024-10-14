import {View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {ScaledSheet} from 'react-native-size-matters/extend';
import Typo from '@/components/Typo';
import IconXML from '@/components/IconXML';
import colorsConstant from '@/constants/colors.constant';
import {useTranslation} from 'react-i18next';
import PlusCircle from '@/assets/icons/PlusCircle';
import {IIngredient} from '@/types/kitchen.type';
import {EUnit} from '@/enums/kitchen.enum';

const listIngredientsFake: IIngredient[] = [
  {
    id: 1,
    name_en: 'Flour',
    name_vi: 'Bột mì',
    img_url: 'https://example.com/flour.jpg',
    unit: EUnit.GRAM,
    quantity: 500,
  },
  {
    id: 2,
    name_en: 'Sugar',
    name_vi: 'Đường',
    img_url: 'https://example.com/sugar.jpg',
    unit: EUnit.GRAM,
    quantity: 200,
  },
  {
    id: 3,
    name_en: 'Egg',
    name_vi: 'Trứng',
    img_url: 'https://example.com/egg.jpg',
    unit: null, // No specific unit for countable items like eggs
    quantity: 3,
  },
  {
    id: 4,
    name_en: 'Milk',
    name_vi: 'Sữa',
    img_url: 'https://example.com/milk.jpg',
    unit: EUnit.ML,
    quantity: 250,
  },
  {
    id: 5,
    name_en: 'Butter',
    name_vi: 'Bơ',
    img_url: 'https://example.com/butter.jpg',
    unit: EUnit.GRAM,
    quantity: 100,
  },
  {
    id: 6,
    name_en: 'Salt',
    name_vi: 'Muối',
    img_url: 'https://example.com/salt.jpg',
    unit: EUnit.GRAM,
    quantity: 5,
  },
  {
    id: 7,
    name_en: 'Baking Powder',
    name_vi: 'Bột nở',
    img_url: 'https://example.com/baking_powder.jpg',
    unit: EUnit.GRAM,
    quantity: 10,
  },
  {
    id: 8,
    name_en: 'Vanilla Extract',
    name_vi: 'Tinh chất vani',
    img_url: 'https://example.com/vanilla_extract.jpg',
    unit: EUnit.ML,
    quantity: 5,
  },
  {
    id: 9,
    name_en: 'Chicken Breast',
    name_vi: 'Ức gà',
    img_url: 'https://example.com/chicken_breast.jpg',
    unit: EUnit.GRAM,
    quantity: 300,
  },
  {
    id: 10,
    name_en: 'Olive Oil',
    name_vi: 'Dầu ô liu',
    img_url: 'https://example.com/olive_oil.jpg',
    unit: EUnit.ML,
    quantity: 30,
  },
];

const KitchenIngredients = () => {
  const {t} = useTranslation();
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [listIngredients, setListIngredient] = useState<IIngredient[]>([]);

  const handleAddIngredient = useCallback(() => {
    setIsShowModalAdd(true);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Typo style={styles.headerLabel}>
          {t('kitchen.kitchen_ingredient')}
        </Typo>
        <IconXML
          icon={PlusCircle}
          width={32}
          height={32}
          onPress={handleAddIngredient}
        />
      </View>
      {listIngredients.length ? (
        <View style={styles.listIngredients}></View>
      ) : (
        <Typo style={styles.emptyLabel}>{t('kitchen.empty_ingredient')}</Typo>
      )}
    </View>
  );
};

export default KitchenIngredients;

const styles = ScaledSheet.create({
  mainContainer: {},
  header: {
    backgroundColor: '#FFF',
    borderRadius: '16@s',
    paddingVertical: '12@s',
    paddingHorizontal: '18@s',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: colorsConstant.shadow_2,
    elevation: 4,
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
  headerLabel: {
    fontSize: '20@s',
    fontWeight: '600',
    color: colorsConstant.black_1,
  },
  listIngredients: {},
  emptyLabel: {
    fontSize: '14@s',
    color: colorsConstant.gray_2,
    marginTop: '8@s',
    textAlign: 'right',
    paddingRight: '8@s',
  },
});
