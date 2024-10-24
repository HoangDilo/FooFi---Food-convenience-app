import {View} from 'react-native';
import React, {useState} from 'react';
import Typo from '@/components/Typo';
import {ScaledSheet} from 'react-native-size-matters/extend';
import colorsConstant from '@/constants/colors.constant';
import {useTranslation} from 'react-i18next';

const Authentication = () => {
  const {t} = useTranslation();

  const [type, setType] = useState('login');

  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Typo style={styles.title}>{t('my.sign_in')}</Typo>
        <Typo style={styles.description}>{t('my.sign_in_description')}</Typo>
      </View>
      <View style={styles.loginForm}></View>
    </View>
  );
};

export default Authentication;

const styles = ScaledSheet.create({
  container: {},
  titleBox: {
    backgroundColor: colorsConstant.primary,
    borderBottomRightRadius: '20@s',
    paddingVertical: '20@s',
    height: '240@vs',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: '100@s',
  },
  title: {
    fontWeight: '700',
    color: '#FFF',
    fontSize: '28@s',
  },
  description: {
    fontWeight: '500',
    color: '#FFF',
    fontSize: '16@s',
  },
  loginForm: {
    padding: '24@s',
  },
});
