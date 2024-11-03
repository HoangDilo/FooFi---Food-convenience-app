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
import ItemIngredientSelect from './ItemIngredientSelect';
import {useKitchenIngredient} from '@/api/hooks/useKitchen';

interface IModalAddKitchenIngredientProps {
  isVisible: boolean;
  listIngredient?: IIngredient[];
  onClose: () => void;
  onSubmit: (ingredient: IIngredient) => void;
}

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
  const [amount, setAmount] = useState(0);
  const dataIngredients = useKitchenIngredient();

  console.log(dataIngredients.data?.pages);

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
    setSearchValue('');
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
                data={dataIngredients.data?.pages || []}
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
                showsVerticalScrollIndicator={false}
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
