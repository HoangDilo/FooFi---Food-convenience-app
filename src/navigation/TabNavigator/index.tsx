import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {TAB} from '@/constants/tabs.constant';

import HomeScreen from '@/screens/Home';
import OtherChefsScreen from '@/screens/OtherChefs';

import MyScreen from '@/screens/My';
import KitchenScreen from '@/screens/Kitchen';
import ChatBotScreen from '@/screens/ChatBot';
import {MainTabParamList} from '@/types/navigation.type';
import CustomBottomTab from '@/components/CustomBottomTab';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomBottomTab {...props} />}
      screenOptions={() => {
        return {
          headerShown: false,
        };
      }}>
      <Tab.Screen name={TAB.HOME_TAB as 'home_tab'} component={HomeScreen} />
      <Tab.Screen name={TAB.KITCHEN as 'kitchen'} component={KitchenScreen} />
      <Tab.Screen
        name={TAB.OTHER_CHEFS as 'other_chefs'}
        component={OtherChefsScreen}
      />
      <Tab.Screen name={TAB.CHAT_BOT as 'chat_bot'} component={ChatBotScreen} />
      <Tab.Screen name={TAB.MY as 'my'} component={MyScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
