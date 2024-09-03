import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {TAB} from '@/constants/tabs.constant';

import HomeScreen from '@/screens/Home';
import OtherChefsScreen from '@/screens/OtherChefs';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={TAB.HOME_TAB} component={HomeScreen} />
      <Tab.Screen name={TAB.OTHER_CHEFS} component={OtherChefsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
