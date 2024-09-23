import React, {useMemo} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
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
import { scale, ScaledSheet } from 'react-native-size-matters/extend';

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
          {t('home.its_now')}
          <Typo style={styles.daySessionLabel}>
            {' '}
            {t(`daySession.${sessionLabel}`)}!
          </Typo>
        </Typo>
        <IconXML
          icon={SESSION_ICONS[sessionLabel as keyof typeof SESSION_ICONS]}
          width={scale(48)}
          height={scale(48)}
        />
      </View>
      <View>
        <View>
          <Typo style={styles.labelDishesList}>
            {t('home.dishes_for')} {t(`daySession.${sessionLabel}`)}:
          </Typo>
          <Pressable>
            <Typo style={styles.seeAll}>{t('see_all')}</Typo>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default DaySessionRecommend;

const styles = ScaledSheet.create({
  container: {},
  daySessionLabel: {
    color: colorsConstant.primary,
    fontSize: '28@s',
    lineHeight: '32@s',
    fontWeight: '600',
  },
  daySessionWrapper: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelDishesList: {
    fontSize: 14,
    color: colorsConstant.black_1,
  },
  seeAll: {

  }
});
