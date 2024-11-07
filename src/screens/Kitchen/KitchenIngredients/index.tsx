import {View} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {scale, ScaledSheet} from 'react-native-size-matters/extend';
import Typo from '@/components/Typo';
import IconXML from '@/components/IconXML';
import colorsConstant from '@/constants/colors.constant';
import {useTranslation} from 'react-i18next';
import {IIngredient} from '@/types/kitchen.type';
import ModalAddKitchenIngredient from '@/components/ModalAddKitchenIngredient';
import ItemIngredientDisplay from './ItemIngredientDisplay';
import ModalConfirm from '@/components/ModalConfirm';
import ModalEditIngredient from '@/components/ModalEditIngredient';
import Pagination from '@/components/Pagination';
import {useUserIngredients} from '@/api/hooks/useKitchen';
import FastImage from 'react-native-fast-image';
import {deviceWidth} from '@/constants/device.constant';
import PlusWhite from '@/assets/icons/PlusWhite';

const PAGE_LIMIT = 5;

const KitchenIngredients = () => {
  const {t, i18n} = useTranslation();
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [ingredientActing, setIngredientActing] = useState<IIngredient | null>(
    null,
  );
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const {data: listIngredients} = useUserIngredients(currentPage);

  console.log(listIngredients?.data);

  const ingredientInfoDisplay = useMemo(
    () =>
      `${ingredientActing?.quantity} ${ingredientActing?.unit} ${
        ingredientActing
          ? ingredientActing[`name_${i18n.language}` as keyof IIngredient]
          : ''
      }`,
    [i18n.language, ingredientActing],
  );

  const handleAddIngredient = useCallback(() => {
    setIsShowModalAdd(true);
  }, []);

  const handleAddIngredientToList = useCallback((ingredient: IIngredient) => {},
  []);

  const handleChooseEdit = useCallback((ingredient: IIngredient) => {
    setIngredientActing(ingredient);
    setIsShowModalEdit(true);
  }, []);

  const handleChooseDelete = useCallback((ingredient: IIngredient) => {
    setIngredientActing(ingredient);
    setIsShowModalConfirm(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    setIsShowModalConfirm(false);
  }, []);

  const handleEditIngredient = useCallback(
    (value: string) => {
      const listClone = JSON.parse(
        JSON.stringify(listIngredients),
      ) as IIngredient[];
      const ingredientEdit = listClone.find(
        item => item.id === ingredientActing?.id,
      );
      if (ingredientEdit) {
        ingredientEdit.quantity = parseFloat(value);
      }

      setIsShowModalEdit(false);
    },
    [ingredientActing?.id, listIngredients],
  );

  console.log(currentPage);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Typo style={styles.headerLabel}>
          {t('kitchen.kitchen_ingredient')}
        </Typo>
        <IconXML
          icon={PlusWhite}
          width={32}
          height={32}
          onPress={handleAddIngredient}
        />
        <FastImage
          source={require('@/assets/images/kitcheningredient.jpg')}
          style={styles.backgroundImg}
        />
        <View style={styles.blackCover} />
      </View>
      {listIngredients?.data.length ? (
        <View style={styles.listIngredients}>
          {listIngredients.data.map(ingredient => (
            <ItemIngredientDisplay
              ingredient={ingredient}
              key={ingredient.id}
              onChooseEdit={() => handleChooseEdit(ingredient)}
              onChooseDelete={() => handleChooseDelete(ingredient)}
            />
          ))}
          <Pagination
            limit={PAGE_LIMIT}
            currentPage={currentPage}
            totalCount={listIngredients.totalItems}
            currentPageItemCount={listIngredients.data.length}
            nameItem={t('kitchen.kitchen_ingredient').toLocaleLowerCase()}
            onGoNext={() => setCurrentPage(currentPage + 1)}
            onGoPrevious={() => setCurrentPage(currentPage - 1)}
          />
        </View>
      ) : (
        <Typo style={styles.emptyLabel}>{t('kitchen.empty_ingredient')}</Typo>
      )}
      <ModalAddKitchenIngredient
        isVisible={isShowModalAdd}
        onClose={() => setIsShowModalAdd(false)}
        onSubmit={handleAddIngredientToList}
      />
      <ModalConfirm
        title={t('confirm_delete_title')}
        description={t('confirm_delete_desc', {
          value: ingredientInfoDisplay,
        })}
        isVisible={isShowModalConfirm}
        onClose={() => setIsShowModalConfirm(false)}
        onConfirm={handleConfirmDelete}
      />
      <ModalEditIngredient
        isVisible={isShowModalEdit}
        onClose={() => setIsShowModalEdit(false)}
        onConfirm={handleEditIngredient}
      />
    </View>
  );
};

export default KitchenIngredients;

const styles = ScaledSheet.create({
  mainContainer: {},
  header: {
    position: 'relative',
    overflow: 'hidden',
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
    color: '#FFF',
  },
  listIngredients: {
    gap: '8@s',
    paddingHorizontal: '8@s',
    paddingVertical: '12@s',
  },
  emptyLabel: {
    fontSize: '14@s',
    color: colorsConstant.gray_1,
    marginVertical: '8@s',
    textAlign: 'right',
    paddingRight: '8@s',
  },
  backgroundImg: {
    height: '60@s',
    width: deviceWidth - 2 * scale(24),
    position: 'absolute',
    top: 0,
    zIndex: -1,
  },
  blackCover: {
    backgroundColor: '#00000060',
    position: 'absolute',
    height: '60@s',
    width: deviceWidth - 2 * scale(24),
    zIndex: -1,
  },
});
