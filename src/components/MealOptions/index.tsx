import React from 'react';
import {StyleSheet, View} from 'react-native';

import {MEALS} from '@/enums/meal.enum';

import Breakfast from '@/assets/icons/Breakfast';
import Lunch from '@/assets/icons/Lunch';
import Linner from '@/assets/icons/Linner';
import Dinner from '@/assets/icons/Dinner';
import Supper from '@/assets/icons/Supper';
import { SESSION } from '@/enums/session.enum';

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
    <View style={{flex: 1}}>
      
    </View>
  );
};

export default MealOptions;

const styles = StyleSheet.create({});
