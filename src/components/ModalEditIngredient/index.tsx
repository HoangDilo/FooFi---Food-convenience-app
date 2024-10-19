import {TouchableHighlight, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import ModalRemake from '../ModalRemake';
import colorsConstant from '@/constants/colors.constant';
import {ScaledSheet} from 'react-native-size-matters/extend';
import Typo from '../Typo';
import {useTranslation} from 'react-i18next';
import {TextInput} from 'react-native-gesture-handler';

interface IModalEditIngredientProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (value: string) => void;
}

const ModalEditIngredient = ({
  isVisible,
  onClose,
  onConfirm,
}: IModalEditIngredientProps) => {
  const {t} = useTranslation();

  const [value, setValue] = useState('');

  const handleCloseModal = useCallback(() => {
    setValue('');
    onClose();
  }, [onClose]);

  const handleConfirm = useCallback(() => {
    onConfirm(value);
    handleCloseModal();
  }, [handleCloseModal, onConfirm, value]);

  return (
    <ModalRemake isVisible={isVisible}>
      {isVisible && (
        <View style={styles.container}>
          <Typo style={styles.title}>{t('kitchen.edit_modal_title')}</Typo>
          <TextInput
            value={value}
            onChangeText={setValue}
            style={styles.input}
            placeholder={t('kitchen.placeholder_modal_edit')}
            placeholderTextColor={colorsConstant.gray_1}
            keyboardType="number-pad"
          />
          <View style={styles.buttonContainer}>
            <Typo onPress={onClose} style={styles.cancel}>
              {t('cancel')}
            </Typo>
            <TouchableHighlight
              onPress={handleConfirm}
              style={styles.addWrapper}
              underlayColor={colorsConstant.primary_press}>
              <Typo style={styles.add}>{t('confirm')}</Typo>
            </TouchableHighlight>
          </View>
        </View>
      )}
    </ModalRemake>
  );
};

export default ModalEditIngredient;

const styles = ScaledSheet.create({
  container: {
    backgroundColor: colorsConstant.background,
    padding: '20@s',
    borderRadius: '10@s',
    gap: '12@s',
  },
  title: {
    fontWeight: '600',
    fontSize: '16@s',
    color: colorsConstant.black_1,
    marginTop: '4@s',
  },
  input: {
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
  },
  buttonContainer: {
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
});
