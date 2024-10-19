import {View} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {ScaledSheet} from 'react-native-size-matters/extend';
import Typo from '@/components/Typo';
import IconXML from '@/components/IconXML';
import colorsConstant from '@/constants/colors.constant';
import {useTranslation} from 'react-i18next';
import PlusCircle from '@/assets/icons/PlusCircle';
import {IIngredient} from '@/types/kitchen.type';
import ModalAddKitchenIngredient from '@/components/ModalAddKitchenIngredient';
import ItemIngredientDisplay from './ItemIngredientDisplay';
import ModalConfirm from '@/components/ModalConfirm';
import ModalEditIngredient from '@/components/ModalEditIngredient';
import Pagination from '@/components/Pagination';

const PAGE_LIMIT = 5;

const KitchenIngredients = () => {
  const {t, i18n} = useTranslation();
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [listIngredients, setListIngredient] = useState<IIngredient[]>([]);
  const [ingredientActing, setIngredientActing] = useState<IIngredient | null>(
    null,
  );
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [currentPage, setCurentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(10);

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

  const handleAddIngredientToList = useCallback(
    (ingredient: IIngredient) => {
      const listClone = JSON.parse(JSON.stringify(listIngredients));
      listClone.push(ingredient);
      setListIngredient(listClone);
    },
    [listIngredients],
  );

  const handleChooseEdit = useCallback((ingredient: IIngredient) => {
    setIngredientActing(ingredient);
    setIsShowModalEdit(true);
  }, []);

  const handleChooseDelete = useCallback((ingredient: IIngredient) => {
    setIngredientActing(ingredient);
    setIsShowModalConfirm(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    const listDeleted = listIngredients.filter(
      item => item.id !== ingredientActing?.id,
    );
    setListIngredient(listDeleted);
    setIsShowModalConfirm(false);
  }, [ingredientActing?.id, listIngredients]);

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
      setListIngredient(listClone);
      setIsShowModalEdit(false);
    },
    [ingredientActing?.id, listIngredients],
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
              onChooseEdit={() => handleChooseEdit(ingredient)}
              onChooseDelete={() => handleChooseDelete(ingredient)}
            />
          ))}
          <Pagination
            limit={PAGE_LIMIT}
            currentPage={currentPage}
            totalCount={totalCount}
            currentPageItemCount={listIngredients.length}
            nameItem={t('kitchen.kitchen_ingredient').toLocaleLowerCase()}
            onGoNext={() => setCurentPage(currentPage + 1)}
            onGoPrevious={() => setCurentPage(currentPage - 1)}
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
