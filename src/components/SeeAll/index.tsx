import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import Typo from '../Typo';
import {useTranslation} from 'react-i18next';
import IconXML from '../IconXML';
import ArrowRightGreen from '@/assets/icons/ArrowRightGreen';
import colorsConstant from '@/constants/colors.constant';

const SeeAll = () => {
  const {t} = useTranslation();

  return (
    <Pressable style={styles.seeAllWrapper}>
      <Typo style={styles.seeAll}>{t('see_all')}</Typo>
      <IconXML icon={ArrowRightGreen} width={16} height={16} />
    </Pressable>
  );
};

export default SeeAll;

const styles = StyleSheet.create({
  seeAllWrapper: {
    gap: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAll: {
    fontWeight: '500',
    fontSize: 14,
    color: colorsConstant.secondary,
  },
});
