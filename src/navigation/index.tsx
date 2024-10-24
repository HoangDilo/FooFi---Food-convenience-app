import React, {useCallback, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {MainTabParamList, RootStackParamList} from '@/types/navigation.type';

import {STACK} from '../constants/screens.constant';

import TabNavigator from './TabNavigator';
import CookingInstruction from '@/screens/CookingInstruction';
import SearchScreen from '@/screens/Search';
import AddPost from '@/screens/AddPost';
import DishDetails from '@/screens/DishDetails';
import {useDispatch} from 'react-redux';
import {getAccessToken} from '@/utils/storage';
import {setAccessToken} from '@/store/reducers/my.reducer';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList, MainTabParamList {}
  }
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainNavigator() {
  const dispatch = useDispatch();

  const handleCheckToken = useCallback(async () => {
    const access_token = await getAccessToken();
    dispatch(setAccessToken(access_token ?? ''));
  }, [dispatch]);

  useEffect(() => {
    handleCheckToken();
  }, [handleCheckToken]);

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
