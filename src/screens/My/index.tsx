import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';

const MyScreen = () => {
  const {t} = useTranslation();
  return (
    <View>
      <Text style={{color: 'black'}}>{t('tabs_name.my')}</Text>
    </View>
  );
};

export default MyScreen;

const styles = StyleSheet.create({});
