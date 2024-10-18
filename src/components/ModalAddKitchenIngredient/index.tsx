import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ScaledSheet, verticalScale} from 'react-native-size-matters/extend';
import ModalRemake from '../ModalRemake';
import colorsConstant from '@/constants/colors.constant';
import Typo from '../Typo';
import {useTranslation} from 'react-i18next';
import SearchKitchen from '../SearchKitchen';
import {IIngredient} from '@/types/kitchen.type';
import {EUnit} from '@/enums/kitchen.enum';
import ItemIngredientSelect from './ItemIngredientSelect';

interface IModalAddKitchenIngredientProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (ingredient: IIngredient) => void;
}

const listIngredientsFake: IIngredient[] = [
  {
    id: 1,
    name_en: 'Flour',
    name_vi: 'Bột mì',
    img_url: 'https://ezcloud.vn/wp-content/uploads/2024/02/flour-la-gi.webp',
    unit: EUnit.GRAM,
    quantity: 0,
  },
  {
    id: 2,
    name_en: 'Sugar',
    name_vi: 'Đường',
    img_url:
      'https://www.tasteofhome.com/wp-content/uploads/2019/11/sugar-shutterstock_615908132.jpg',
    unit: EUnit.GRAM,
    quantity: 0,
  },
  {
    id: 3,
    name_en: 'Egg',
    name_vi: 'Trứng',
    img_url:
      'https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/health-benefits-of-eggs-1296x728-feature.jpg?w=1155&h=1528',
    unit: null, // No specific unit for countable items like eggs
    quantity: 0,
  },
  {
    id: 4,
    name_en: 'Milk',
    name_vi: 'Sữa',
    img_url:
      'https://hips.hearstapps.com/hmg-prod/images/filling-of-a-glass-of-milk-in-a-glass-glass-with-royalty-free-image-1707769552.jpg',
    unit: EUnit.ML,
    quantity: 0,
  },
  {
    id: 5,
    name_en: 'Butter',
    name_vi: 'Bơ',
    img_url:
      'https://cdn.tgdd.vn/2020/07/CookProduct/cach-lam-bo-butter-bang-kem-tuoi-heavy-cream-1-1200x676.jpg',
    unit: EUnit.GRAM,
    quantity: 0,
  },
  {
    id: 6,
    name_en: 'Salt',
    name_vi: 'Muối',
    img_url:
      'https://cdn-prod.medicalnewstoday.com/content/images/articles/322/322745/salt-shaker.jpg',
    unit: EUnit.GRAM,
    quantity: 0,
  },
  {
    id: 7,
    name_en: 'Baking Powder',
    name_vi: 'Bột nở',
    img_url:
      'https://www.seriouseats.com/thmb/eMPfsLI7D9h1UxnuoDWTmd_K7tM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2015__12__20151201-baking-powder-vicky-wasik-2-bc534b7950894f70844dd914295d5951.jpg',
    unit: EUnit.GRAM,
    quantity: 0,
  },
  {
    id: 8,
    name_en: 'Vanilla Extract',
    name_vi: 'Tinh chất vani',
    img_url:
      'https://www.clubhouse.ca/-/media/project/oneweb/clubhouseca/products/00066200004637_a1c1.png?rev=dce770297c5e439b9ba51ad0e946340b&vd=20220428T152526Z&extension=webp&hash=FE74673E0B47B5C3AE1A57688C989134',
    unit: EUnit.ML,
    quantity: 0,
  },
  {
    id: 9,
    name_en: 'Chicken Breast',
    name_vi: 'Ức gà',
    img_url:
      'https://rastellis.com/cdn/shop/products/Organic-Chicken-Beasts-2.jpg?v=1701718077&width=1946',
    unit: EUnit.GRAM,
    quantity: 0,
  },
  {
    id: 10,
    name_en: 'Olive Oil',
    name_vi: 'Dầu ô liu',
    img_url:
      'https://cdn-prod.medicalnewstoday.com/content/images/articles/321/321246/olive-oil-in-a-bottle-which-may-be-used-on-the-face.jpg',
    unit: EUnit.ML,
    quantity: 0,
  },
];

const ModalAddKitchenIngredient = ({
  isVisible,
  onClose,
  onSubmit,
}: IModalAddKitchenIngredientProps) => {
  const {t, i18n} = useTranslation();

  const [step, setStep] = useState<number>(0);
  const [searchValue, setSearchValue] = useState('');
  const [ingredientSelected, setIngredientSelected] =
    useState<IIngredient | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [listIngredients, setListIngredients] = useState<IIngredient[]>([]);
  const [amount, setAmount] = useState(0);

  const stepMapping = useMemo(
    () => ({
      0: {
        title: t('kitchen.select_ingredient'),
        description: '',
      },
      1: {
        title: t('kitchen.select_amount', {
          ingredient: ingredientSelected
            ? ingredientSelected[`name_${i18n.language}` as keyof IIngredient]
            : '',
        }),
        description: '',
      },
      2: {
        title: t('confirm'),
        description: t('kitchen.confirm_content', {
          food: ingredientSelected
            ? ingredientSelected[`name_${i18n.language}` as keyof IIngredient]
            : '',
        }),
      },
    }),
    [i18n.language, ingredientSelected, t],
  );

  const listIngredientsFilter = useMemo(
    () =>
      listIngredients.filter(ingre =>
        ingre[`name_${i18n.language}` as keyof IIngredient]
          ?.toString()
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase()),
      ),
    [i18n.language, listIngredients, searchValue],
  );

  const isAllowGoNext = useMemo(() => {
    if (step === 0) {
      return !!ingredientSelected;
    } else if (step === 1) {
      return !!amount;
    }
  }, [amount, ingredientSelected, step]);

  const handleGoBack = useCallback(() => {
    Keyboard.dismiss();
    setStep(step - 1);
  }, [step]);

  const handleGoNext = useCallback(() => {
    setStep(step + 1);
  }, [step]);

  const handleCloseModal = useCallback(() => {
    onClose();
    setIngredientSelected(null);
    setAmount(0);
    setStep(0);
  }, [onClose]);

  const handleConfirm = useCallback(() => {
    ingredientSelected &&
      amount &&
      onSubmit({
        ...ingredientSelected,
        quantity: amount,
      });
    handleCloseModal();
  }, [amount, handleCloseModal, ingredientSelected, onSubmit]);

  const handleSetIngredientSelected = useCallback(
    (ingredient: IIngredient | null) => {
      setIngredientSelected(ingredient);
    },
    [],
  );

  const handleChangeAmount = useCallback((value: string) => {
    setAmount(value ? parseFloat(value) : 0);
  }, []);

  useEffect(() => {
    setListIngredients(listIngredientsFake);
  }, []);

  useEffect(() => {
    setAmount(0);
  }, [ingredientSelected]);

  return (
    <ModalRemake isVisible={isVisible}>
      {isVisible && (
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={verticalScale(32)}>
          <View style={styles.mainContainer}>
            <Typo style={styles.title}>
              {stepMapping[step as keyof typeof stepMapping].title}
            </Typo>
            {step === 0 && (
              <SearchKitchen
                value={searchValue}
                onChange={setSearchValue}
                placeholderName={t('kitchen.kitchen_ingredient')}
              />
            )}
            {step === 0 && (
              <FlatList
                data={listIngredientsFilter}
                renderItem={({item}) => (
                  <ItemIngredientSelect
                    ingredient={item}
                    isActive={ingredientSelected?.id === item.id}
                    onSelectIngredient={() => handleSetIngredientSelected(item)}
                    onUnselectIngredient={() =>
                      handleSetIngredientSelected(null)
                    }
                  />
                )}
                keyExtractor={item => `${item.id}`}
                keyboardShouldPersistTaps="handled"
                style={styles.flatList}
                contentContainerStyle={styles.flatListContainer}
                numColumns={2}
                columnWrapperStyle={{gap: 10}}
              />
            )}
            {step === 1 && (
              <View style={styles.inputNumberWrapper}>
                <TextInput
                  keyboardType="number-pad"
                  style={styles.inputNumber}
                  placeholderTextColor={colorsConstant.gray_2}
                  placeholder="0"
                  cursorColor={colorsConstant.primary}
                  value={amount ? amount.toString() : ''}
                  onChangeText={handleChangeAmount}
                  onSubmitEditing={handleGoNext}
                />
                <Typo style={styles.unit}>{ingredientSelected?.unit}</Typo>
              </View>
            )}
            {step === 2 && (
              <Typo style={styles.confirmDescription}>{`${amount} ${
                ingredientSelected?.unit ? ingredientSelected.unit + ' ' : ''
              }${stepMapping[step].description}`}</Typo>
            )}
            <View style={styles.buttonsContainer}>
              {step <= 0 ? (
                <Typo onPress={handleCloseModal} style={styles.cancel}>
                  {t('close')}
                </Typo>
              ) : (
                <Typo onPress={handleGoBack} style={styles.cancel}>
                  {t('back')}
                </Typo>
              )}
              {step < 2 ? (
                isAllowGoNext && (
                  <TouchableHighlight
                    onPress={handleGoNext}
                    style={styles.addWrapper}
                    underlayColor={colorsConstant.primary_press}>
                    <Typo style={styles.add}>{t('next')}</Typo>
                  </TouchableHighlight>
                )
              ) : (
                <TouchableHighlight
                  onPress={handleConfirm}
                  style={styles.addWrapper}
                  underlayColor={colorsConstant.primary_press}>
                  <Typo style={styles.add}>{t('confirm')}</Typo>
                </TouchableHighlight>
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      )}
    </ModalRemake>
  );
};

export default ModalAddKitchenIngredient;

const styles = ScaledSheet.create({
  mainContainer: {
    backgroundColor: colorsConstant.background,
    padding: '24@s',
    borderRadius: '10@s',
    gap: '12@s',
  },
  title: {
    fontWeight: '600',
    fontSize: '16@s',
    color: colorsConstant.black_1,
    marginTop: '4@s',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: '16@s',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: '12@s',
  },
  cancel: {
    color: colorsConstant.primary,
    fontSize: '16@s',
    fontWeight: '500',
    paddingVertical: '6@s',
  },
  addWrapper: {
    backgroundColor: colorsConstant.primary,
    paddingHorizontal: '12@s',
    borderRadius: 999,
    paddingVertical: '6@s',
  },
  add: {
    color: '#FFF',
    fontSize: '16@s',
    fontWeight: '600',
  },
  flatList: {
    maxHeight: '280@s',
    height: '280@s',
    marginTop: '8@s',
  },
  flatListContainer: {
    rowGap: '12@s',
    columnGap: '8@s',
    paddingBottom: '8@s',
  },
  inputNumber: {
    shadowColor: colorsConstant.shadow,
    elevation: 4,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    borderRadius: 999,
    backgroundColor: '#FFF',
    paddingLeft: '12@s',
    paddingVertical: '8@s',
    color: colorsConstant.black_1,
    fontSize: '16@s',
    flex: 1,
  },
  inputNumberWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  unit: {
    position: 'absolute',
    color: colorsConstant.black_1,
    fontWeight: '400',
    right: '16@s',
    fontSize: '16@s',
  },
  confirmDescription: {
    color: colorsConstant.black_2,
    fontSize: '16@s',
  },
});
