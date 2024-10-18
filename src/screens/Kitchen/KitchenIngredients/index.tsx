import {View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {ScaledSheet} from 'react-native-size-matters/extend';
import Typo from '@/components/Typo';
import IconXML from '@/components/IconXML';
import colorsConstant from '@/constants/colors.constant';
import {useTranslation} from 'react-i18next';
import PlusCircle from '@/assets/icons/PlusCircle';
import {IIngredient} from '@/types/kitchen.type';
import ModalAddKitchenIngredient from '@/components/ModalAddKitchenIngredient';
import ItemIngredientDisplay from './ItemIngredientDisplay';

const KitchenIngredients = () => {
  const {t} = useTranslation();
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [listIngredients, setListIngredient] = useState<IIngredient[]>([]);

  const handleAddIngredient = useCallback(() => {
    setIsShowModalAdd(true);
  }, []);

  const handleAddIngredientToList = useCallback(
    (ingredient: IIngredient) => {
      const listClone = JSON.parse(JSON.stringify(listIngredients));
      listClone.push(ingredient);
      console.log(listClone);

      setListIngredient(listClone);
    },
    [listIngredients],
  );

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
        <View style={styles.listIngredients}>
          {listIngredients.map(ingredient => (
            <ItemIngredientDisplay
              ingredient={ingredient}
              key={ingredient.id}
            />
          ))}
        </View>
      ) : (
        <Typo style={styles.emptyLabel}>{t('kitchen.empty_ingredient')}</Typo>
      )}
      <ModalAddKitchenIngredient
        isVisible={isShowModalAdd}
        onClose={() => setIsShowModalAdd(false)}
        onSubmit={handleAddIngredientToList}
      />
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
  listIngredients: {
    gap: '8@s',
    paddingHorizontal: '8@s',
    paddingVertical: '12@s',
  },
  emptyLabel: {
    fontSize: '14@s',
    color: colorsConstant.gray_2,
    marginTop: '8@s',
    textAlign: 'right',
    paddingRight: '8@s',
  },
});
