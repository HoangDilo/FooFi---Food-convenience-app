import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {MainTabParamList, RootStackParamList} from '@/types/navigation.type';

import {STACK} from '../constants/screens.constant';

import TabNavigator from './TabNavigator';
import CookingInstruction from '@/screens/CookingInstruction';
import SearchScreen from '@/screens/Search';
import AddPost from '@/screens/AddPost';
import DishDetails from '@/screens/DishDetails';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList, MainTabParamList {}
  }
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name={STACK.MAIN_TAB as 'main_tab'}
          component={TabNavigator}
        />
        <Stack.Screen
          name={STACK.INSTRUCTION as 'instruction'}
          component={CookingInstruction}
          options={{
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name={STACK.SEARCH as 'search'}
          component={SearchScreen}
        />
        <Stack.Screen name={STACK.ADD_POST as 'add_post'} component={AddPost} />
        <Stack.Screen
          name={STACK.DISH_DETAILS as 'dish_details'}
          component={DishDetails}
        />
        <Stack.Screen
          name={STACK.DISH_DETAILS_2 as 'dish_details_2'}
          component={DishDetails}
          options={{
            animation: 'none',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
