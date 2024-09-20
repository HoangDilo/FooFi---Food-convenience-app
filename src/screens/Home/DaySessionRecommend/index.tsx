import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import Typo from '@/components/Typo';
import {useTranslation} from 'react-i18next';
import {getDaySession} from '@/utils/time';
import colorsConstant from '@/constants/colors.constant';

const DaySessionRecommend = () => {
  const {t} = useTranslation();
  const sessionLabel = useMemo(() => getDaySession(), []);

  return (
    <View style={styles.container}>
      <Typo style={styles.daySessionLabel}>
        {t('home.its')} {sessionLabel} {t('home.now')}
      </Typo>
    </View>
  );
};

export default DaySessionRecommend;

const styles = StyleSheet.create({
  container: {},
  daySessionLabel: {
    color: colorsConstant.primary,
    fontSize: 28,
    fontWeight: '600',
  },
});
