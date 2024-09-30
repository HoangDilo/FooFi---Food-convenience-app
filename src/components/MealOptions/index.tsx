import React from 'react';
import {View} from 'react-native';

import {MEALS} from '@/enums/meal.enum';

import Breakfast from '@/assets/icons/Breakfast';
import Lunch from '@/assets/icons/Lunch';
import Linner from '@/assets/icons/Linner';
import Dinner from '@/assets/icons/Dinner';
import Supper from '@/assets/icons/Supper';
import {SESSION} from '@/enums/session.enum';
import IconXML from '../IconXML';
import {ScaledSheet} from 'react-native-size-matters/extend';
import colorsConstant from '@/constants/colors.constant';

const listMealOptions = [
  {
    id: 1,
    label: MEALS.BREAKFAST,
    sesion: SESSION.MORNING,
    icon: Breakfast,
  },
  {
    id: 2,
    label: MEALS.LUNCH,
    icon: Lunch,
  },
  {
    id: 3,
    label: MEALS.LINNER,
    icon: Linner,
  },
  {
    id: 4,
    label: MEALS.DINNER,
    icon: Dinner,
  },
  {
    id: 5,
    label: MEALS.SUPPER,
    icon: Supper,
  },
];

interface IMealOptionsProps {
  activeMeal?: MEALS;
  onChangeActiveMeal?: () => void;
}

const MealOptions = ({}: IMealOptionsProps) => {
  return (
    <View style={styles.container}>
      {listMealOptions.map(item => (
        <View key={item.id}>
          <View style={styles.circleRound}>
            <IconXML icon={item.icon} width={52} height={52} />
          </View>
        </View>
      ))}
    </View>
  );
};

export default MealOptions;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40@vs',
  },
  circleRound: {
    padding: 2,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colorsConstant.primary,
    overflow: 'hidden',
  },
});
