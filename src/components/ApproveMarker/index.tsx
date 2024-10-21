import {View} from 'react-native';
import React from 'react';
import {ScaledSheet} from 'react-native-size-matters/extend';
import colorsConstant from '@/constants/colors.constant';
import Typo from '../Typo';
import {useTranslation} from 'react-i18next';

const ApproveMarker = () => {
  const {t} = useTranslation();

  return (
    <View style={styles.approve}>
      <Typo style={styles.label}>{t('approved')}</Typo>
    </View>
  );
};

export default ApproveMarker;

const styles = ScaledSheet.create({
  approve: {
    borderWidth: '4@s',
    borderColor: colorsConstant.approved,
    paddingHorizontal: '6@s',
    paddingVertical: '4@s',
    position: 'absolute',
    top: '48@vs',
    right: '12@s',
    zIndex: 3,
  },
  label: {
    fontWeight: '700',
    fontSize: '16@s',
    color: colorsConstant.approved,
  },
});
