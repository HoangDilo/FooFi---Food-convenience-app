import {TouchableHighlight, View} from 'react-native';
import React, {useCallback} from 'react';
import ModalRemake from '../ModalRemake';
import {ScaledSheet} from 'react-native-size-matters/extend';
import colorsConstant from '@/constants/colors.constant';
import FastImage from 'react-native-fast-image';
import {useAppSelector} from '@/hooks/redux';
import Typo from '../Typo';
import {useTranslation} from 'react-i18next';
import {launchImageLibrary} from 'react-native-image-picker';

interface IModalRemake {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalEditProfile = ({isVisible, onClose, onConfirm}: IModalRemake) => {
  const {t} = useTranslation();
  const {user_info} = useAppSelector(state => state.my);

  const handleConfirm = useCallback(() => {
    launchImageLibrary({mediaType: 'photo'});
  }, []);

  return (
    <ModalRemake isVisible={isVisible}>
      <View style={styles.container}>
        <FastImage
          source={{uri: user_info.avatar_url}}
          style={styles.avatar}
          resizeMode="center"
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
    </ModalRemake>
  );
};

export default ModalEditProfile;

const styles = ScaledSheet.create({
  container: {
    borderRadius: '16@s',
    padding: '20@s',
    backgroundColor: colorsConstant.background,
  },
  avatar: {
    width: '36@s',
    height: '36@s',
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
