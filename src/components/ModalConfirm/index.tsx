import {TouchableHighlight, View} from 'react-native';
import React from 'react';
import ModalRemake from '../ModalRemake';
import {ScaledSheet} from 'react-native-size-matters/extend';
import colorsConstant from '@/constants/colors.constant';
import Typo from '../Typo';
import {useTranslation} from 'react-i18next';

interface IModalConfirm {
  isVisible: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalConfirm = ({
  isVisible,
  title,
  description,
  onClose,
  onConfirm,
}: IModalConfirm) => {
  const {t} = useTranslation();

  return (
    <ModalRemake isVisible={isVisible}>
      <View style={styles.modalConfirm}>
        <Typo style={styles.title}>{title}</Typo>
        <Typo style={styles.description}>{description}</Typo>
        <View style={styles.buttonContainer}>
          <Typo onPress={onClose} style={styles.cancel}>
            {t('cancel')}
          </Typo>
          <TouchableHighlight
            onPress={onConfirm}
            style={styles.addWrapper}
            underlayColor={colorsConstant.primary_press}>
            <Typo style={styles.add}>{t('delete')}</Typo>
          </TouchableHighlight>
        </View>
      </View>
    </ModalRemake>
  );
};

export default ModalConfirm;

const styles = ScaledSheet.create({
  modalConfirm: {
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
  description: {
    fontSize: '16@s',
    color: colorsConstant.black_2,
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
