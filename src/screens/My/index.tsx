import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import Typo from '@/components/Typo';

const MyScreen = () => {
  const {t} = useTranslation();
  return (
    <View>
      <Typo style={{color: 'black'}}>{t('tabs_name.my')}</Typo>
    </View>
  );
};

export default MyScreen;

const styles = StyleSheet.create({});
