import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {TAB} from '@/constants/tabs.constant';

import HomeScreen from '@/screens/Home';
import OtherChefsScreen from '@/screens/OtherChefs';
import IconXML from '@/components/IconXML';
import HomeTab from '@/assets/icons/HomeTab';
import OtherChefsTab from '@/assets/icons/OtherChefsTab';

const Tab = createBottomTabNavigator();

const tabIcon = {
  home_tab: {
    default: HomeTab,
    active: 
  },
  other_chefs: OtherChefsTab,
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => {
        return {
          tabBarIcon: ({focused}) => (
            <IconXML
              icon={tabIcon[route.name as keyof typeof tabIcon]}
              width={32}
              height={32}
              color={'#FF0000'}
            />
          ),
          title: 'Home',
          tabBarLabel: ()
        };
      }}>
      <Tab.Screen name={TAB.HOME_TAB} component={HomeScreen} />
      <Tab.Screen name={TAB.OTHER_CHEFS} component={OtherChefsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
