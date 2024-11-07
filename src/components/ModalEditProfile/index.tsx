import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import ModalRemake from '../ModalRemake';
import {ScaledSheet, verticalScale} from 'react-native-size-matters/extend';
import colorsConstant from '@/constants/colors.constant';
import FastImage from 'react-native-fast-image';
import {useAppSelector} from '@/hooks/redux';
import Typo from '../Typo';
import {useTranslation} from 'react-i18next';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {setUserInfo} from '@/store/reducers/my.reducer';
import storage from '@react-native-firebase/storage';
import moment from 'moment';
import Toast from 'react-native-toast-message';

interface IModalRemake {
  isVisible: boolean;
  onClose: () => void;
}

const ModalEditProfile = ({isVisible, onClose}: IModalRemake) => {
  const {t} = useTranslation();
  const {user_info} = useAppSelector(state => state.my);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const handleConfirm = useCallback(async () => {
    Keyboard.dismiss();
    dispatch(
      setUserInfo({
        avatar_url: avatarUrl,
        name: name,
        email: email,
      }),
    );
    onClose();
    //update api
    try {
      const imageName = avatarUrl.substring(avatarUrl.lastIndexOf('/') + 1);
      const fileName = `${imageName}_${moment().format()}`;
      const refImage = storage().ref(`/foofi/avatars/${fileName}`);
      const task = refImage.putFile(avatarUrl);
      await task;
      Toast.show({
        type: 'success',
        text1: 'Upload success',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Upload failed',
      });
    }
  }, [avatarUrl, dispatch, email, name, onClose]);

  const handleCancel = useCallback(() => {
    onClose();
    setName(user_info.name);
    setEmail(user_info.email);
    setAvatarUrl(user_info.avatar_url);
  }, [onClose, user_info.avatar_url, user_info.email, user_info.name]);

  const handleChangeName = useCallback((value: string) => {
    setName(value);
  }, []);

  const handleChangeEmail = useCallback((value: string) => {
    setEmail(value);
  }, []);

  const handlePressAvatar = useCallback(() => {
    Keyboard.dismiss();
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets) {
        setAvatarUrl(response.assets[0].uri || '');
      }
    });
  }, []);

  useEffect(() => {
    setName(user_info.name);
    setEmail(user_info.email);
    setAvatarUrl(user_info.avatar_url);
  }, [user_info]);

  return (
    <ModalRemake isVisible={isVisible}>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={verticalScale(48)}>
        <View style={styles.container}>
          <Pressable onPress={handlePressAvatar} style={styles.avatarWrapper}>
            <FastImage source={{uri: avatarUrl}} style={styles.avatar} />
          </Pressable>
          <Typo style={styles.label}>{t('my.name')}</Typo>
          <TextInput
            style={styles.input}
            placeholder={t('my.placeholder_name')}
            placeholderTextColor={colorsConstant.skeleton_1}
            cursorColor={colorsConstant.primary}
            textContentType="name"
            value={name}
            onChangeText={handleChangeName}
          />
          <Typo style={styles.label}>{t('my.email')}</Typo>
          <TextInput
            style={styles.input}
            placeholder={t('my.placeholder_email')}
            placeholderTextColor={colorsConstant.skeleton_1}
            cursorColor={colorsConstant.primary}
            textContentType="name"
            value={email}
            onChangeText={handleChangeEmail}
          />
          <View style={styles.buttonContainer}>
            <Typo onPress={handleCancel} style={styles.cancel}>
              {t('cancel')}
            </Typo>
            <TouchableHighlight
              onPress={handleConfirm}
              style={styles.addWrapper}
              underlayColor={colorsConstant.primary_press}>
              <Typo style={styles.add}>{t('save')}</Typo>
            </TouchableHighlight>
          </View>
        </View>
      </KeyboardAvoidingView>
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
  avatarWrapper: {
    width: '72@s',
    borderRadius: 999,
    alignSelf: 'center',
  },
  avatar: {
    width: '72@s',
    height: '72@s',
    borderRadius: 999,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: '16@s',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: '16@s',
    alignSelf: 'flex-end',
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
  input: {
    borderWidth: '1@s',
    borderColor: colorsConstant.skeleton_1,
    borderRadius: 999,
    paddingVertical: '8@s',
    paddingHorizontal: '16@s',
    fontSize: '14@s',
    fontWeight: '500',
    color: colorsConstant.black_1,
  },
  label: {
    fontSize: '16@s',
    fontWeight: '500',
    color: colorsConstant.black_1,
    marginLeft: '8@s',
    marginTop: '16@s',
    marginBottom: '4@s',
  },
});
