import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import Typo from '@/components/Typo';
import {useTranslation} from 'react-i18next';
import {getDaySession} from '@/utils/time';
import colorsConstant from '@/constants/colors.constant';
import IconXML from '@/components/IconXML';
import Morning from '@/assets/icons/Morning';
import Noon from '@/assets/icons/Noon';
import Afternoon from '@/assets/icons/Afternoon';
import Evening from '@/assets/icons/Evening';
import Night from '@/assets/icons/Night';

const SESSION_ICONS = {
  morning: Morning,
  noon: Noon,
  afternoon: Afternoon,
  evening: Evening,
  night: Night,
};

const DaySessionRecommend = () => {
  const {t} = useTranslation();
  const sessionLabel = useMemo(() => getDaySession(), []);

  return (
    <View style={styles.container}>
      <View style={styles.daySessionWrapper}>
        <Typo style={styles.daySessionLabel}>
          {t('home.its')}
          <Typo style={[styles.daySessionLabel, {textTransform: 'capitalize'}]}>
            {' '}
            {sessionLabel}{' '}
          </Typo>
          {t('home.now')}!
        </Typo>
        <IconXML
          icon={SESSION_ICONS[sessionLabel as keyof typeof SESSION_ICONS]}
          width={48}
          height={48}
        />
      </View>
    </View>
  );
};

export default DaySessionRecommend;

const styles = StyleSheet.create({
  container: {},
  daySessionLabel: {
    color: colorsConstant.primary,
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '600',
  },
  daySessionWrapper: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
