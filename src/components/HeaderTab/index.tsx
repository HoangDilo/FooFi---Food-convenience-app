import React from 'react';
import {View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {ScaledSheet} from 'react-native-size-matters/extend';
import Typo from '../Typo';
import colorsConstant from '@/constants/colors.constant';

const HeaderTab = () => {
  const route = useRoute();
  const {t} = useTranslation();

  return (
    <View style={styles.headerContainer}>
      <Typo style={styles.headerTitle}>{t(`tabs_name.${route.name}`)}</Typo>
    </View>
  );
};

export default HeaderTab;

const styles = ScaledSheet.create({
  headerContainer: {
    paddingHorizontal: '12@s',
  },
  headerTitle: {
    fontSize: '32@s',
    fontWeight: '700',
    color: colorsConstant.black_1,
  },
});
