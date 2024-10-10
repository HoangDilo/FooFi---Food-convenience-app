import React, {memo} from 'react';
import {Pressable, View} from 'react-native';

import {MEALS} from '@/enums/meal.enum';

import Breakfast from '@/assets/icons/Breakfast';
import Lunch from '@/assets/icons/Lunch';
import Linner from '@/assets/icons/Linner';
import Dinner from '@/assets/icons/Dinner';
import Supper from '@/assets/icons/Supper';
import {SESSION} from '@/enums/session.enum';
import IconXML from '../IconXML';
import {scale, ScaledSheet} from 'react-native-size-matters/extend';
import colorsConstant from '@/constants/colors.constant';
import CheckOrange from '@/assets/icons/CheckOrange';
import Typo from '../Typo';
import {useTranslation} from 'react-i18next';

const listMealOptions = [
  {
    id: 1,
    label: MEALS.BREAKFAST,
    session: SESSION.MORNING,
    icon: Breakfast,
  },
  {
    id: 2,
    label: MEALS.LUNCH,
    session: SESSION.NOON,
    icon: Lunch,
  },
  {
    id: 3,
    label: MEALS.LINNER,
    session: SESSION.AFTERNOON,
    icon: Linner,
  },
  {
    id: 4,
    label: MEALS.DINNER,
    session: SESSION.EVENING,
    icon: Dinner,
  },
  {
    id: 5,
    label: MEALS.SUPPER,
    session: SESSION.NIGHT,
    icon: Supper,
  },
];

interface IMealOptionsProps {
  activeSession?: string;
  onChangeActiveMeal?: (session: string) => void;
}

const MealOptions = ({
  activeSession,
  onChangeActiveMeal,
}: IMealOptionsProps) => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      {listMealOptions.map(item => (
        <Pressable
          key={item.id}
          style={styles.itemContainer}
          onPress={() =>
            onChangeActiveMeal && onChangeActiveMeal(item.session)
          }>
          <View style={styles.itemWrapper}>
            <View
              style={
                activeSession === item.session
                  ? styles.circleActive
                  : styles.circleRound
              }>
              <IconXML icon={item.icon} width={scale(48)} height={scale(48)} />
            </View>
            {activeSession === item.session && (
              <View style={styles.checkWrapper}>
                <IconXML icon={CheckOrange} width={16} height={16} />
              </View>
            )}
          </View>
          <Typo
            style={[
              {
                color:
                  activeSession === item.session
                    ? colorsConstant.primary
                    : colorsConstant.black_1,
              },
              styles.sessionLabel,
            ]}>
            {t(`mealBySession.${item.session}`)}
          </Typo>
        </Pressable>
      ))}
    </View>
  );
};

export default memo(MealOptions);

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40@vs',
  },
  itemContainer: {
    gap: '6@s',
    alignItems: 'center',
  },
  circleRound: {
    padding: 2,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#FFF',
    overflow: 'hidden',
  },
  circleActive: {
    padding: 2,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colorsConstant.primary,
    overflow: 'hidden',
  },
  itemWrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkWrapper: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#FFF',
    backgroundColor: '#FFF',
    position: 'absolute',
    top: 1,
    right: 1,
  },
  sessionLabel: {
    fontSize: '12@s',
  },
});
