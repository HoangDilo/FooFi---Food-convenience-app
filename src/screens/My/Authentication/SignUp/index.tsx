import {TextInput, TouchableHighlight, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {ScaledSheet} from 'react-native-size-matters/extend';
import Typo from '@/components/Typo';
import colorsConstant from '@/constants/colors.constant';
import {useTranslation} from 'react-i18next';

const INPUTS = [
  {
    key: 'email',
    content_type: 'emailAddress',
    placeholder_key: 'email_placeholder',
    secureTextEntry: false,
  },
  {
    key: 'name',
    content_type: 'name',
    placeholder_key: 'name_placeholder',
    secureTextEntry: false,
  },
  {
    key: 'password',
    content_type: 'password',
    placeholder_key: 'password_placeholder',
    secureTextEntry: true,
  },
  {
    key: 'repeat_password',
    content_type: 'password',
    placeholder_key: 'password_placeholder',
    secureTextEntry: true,
  },
];

const SignIn = () => {
  const {t} = useTranslation();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleSignIn = useCallback(() => {}, []);

  return (
    <View style={styles.loginForm}>
      {INPUTS.map(input => (
        <View key={input.key}>
          <Typo style={styles.label}>{t(`my.${input.key}`)}</Typo>
          <TextInput
            style={styles.input}
            placeholder={t(`my.${input.placeholder_key}`)}
            placeholderTextColor={colorsConstant.skeleton_1}
            cursorColor={colorsConstant.primary}
            secureTextEntry={input.secureTextEntry}
            textContentType={input.content_type as any}
          />
        </View>
      ))}
      <TouchableHighlight
        style={styles.button}
        underlayColor={colorsConstant.primary_press}
        onPress={handleSignIn}>
        <Typo style={styles.buttonLabel}>{t('my.sign_in')}</Typo>
      </TouchableHighlight>
    </View>
  );
};

export default SignIn;

const styles = ScaledSheet.create({
  loginForm: {
    paddingHorizontal: '24@s',
    paddingVertical: '24@s',
    borderRadius: '16@s',
    shadowColor: colorsConstant.shadow,
    backgroundColor: '#fff',
    elevation: 4,
    width: '82%',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    alignSelf: 'center',
    gap: '12@s',
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
    color: colorsConstant.black_1,
    fontWeight: '500',
    fontSize: '16@s',
    marginBottom: '6@s',
    marginLeft: '6@s',
  },
  button: {
    backgroundColor: colorsConstant.primary,
    borderRadius: 999,
    paddingVertical: '12@s',
    marginTop: '6@s',
    alignItems: 'center',
  },
  buttonLabel: {
    fontWeight: '700',
    color: '#FFF',
    fontSize: '18@s',
  },
});
