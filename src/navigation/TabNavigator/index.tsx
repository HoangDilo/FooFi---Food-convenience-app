import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {TAB} from '@/constants/tabs.constant';

import HomeScreen from '@/screens/Home';
import OtherChefsScreen from '@/screens/OtherChefs';
import IconXML from '@/components/IconXML';
import HomeTab from '@/assets/icons/HomeTab';
import OtherChefsTab from '@/assets/icons/OtherChefsTab';
import HomeTabActive from '@/assets/icons/HomeTabActive';
import OtherChefsTabActive from '@/assets/icons/OtherChefsTabActive';
import KitchenTab from '@/assets/icons/KitchenTab';
import KitchenActive from '@/assets/icons/KitchenActive';
import KitchenScreen from '@/screens/Kitchen';
import ChatBotScreen from '@/screens/ChatBot';
import ChatBotTab from '@/assets/icons/ChatBotTab';
import ChatBotActive from '@/assets/icons/ChatBotActive';
import MyScreen from '@/screens/My';
import MyTab from '@/assets/icons/MyTab';
import MyTabActive from '@/assets/icons/MyTabActive';
import colorsConstant from '@/constants/colors.constant';

const Tab = createBottomTabNavigator();

const tabIcon = {
  home_tab: {
    default: HomeTab,
    active: HomeTabActive,
    label: 'Home',
  },
  other_chefs: {
    default: OtherChefsTab,
    active: OtherChefsTabActive,
    label: 'Others',
  },
  kitchen: {
    default: KitchenTab,
    active: KitchenActive,
    label: 'Kitchen',
  },
  chat_bot: {
    default: ChatBotTab,
    active: ChatBotActive,
    label: 'Co-Chef',
  },
  my: {
    default: MyTab,
    active: MyTabActive,
    label: 'My',
  },
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => {
        return {
          tabBarIcon: ({focused}) => (
            <IconXML
              icon={
                tabIcon[route.name as keyof typeof tabIcon][
                  focused ? 'active' : 'default'
                ]
              }
              width={24}
              height={24}
            />
          ),
          tabBarActiveTintColor: colorsConstant.primary,
          tabBarInactiveTintColor: '#8a8a8a',
          headerShown: false,
          title: tabIcon[route.name as keyof typeof tabIcon].label,
          tabBarStyle: styles.tabBarStyle,
          tabBarItemStyle: styles.tabBarItem,
          tabBarLabelStyle: styles.lablItem,
        };
      }}>
      <Tab.Screen name={TAB.HOME_TAB} component={HomeScreen} />
      <Tab.Screen name={TAB.OTHER_CHEFS} component={OtherChefsScreen} />
      <Tab.Screen name={TAB.KITCHEN} component={KitchenScreen} />
      <Tab.Screen name={TAB.CHAT_BOT} component={ChatBotScreen} />
      <Tab.Screen name={TAB.MY} component={MyScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    borderTopWidth: 1,
    borderTopColor: '#FFFFFF',
    height: 80,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
  tabBarItem: {
    paddingTop: 8,
  },
  lablItem: {
    fontSize: 12,
    fontWeight: 500,
  },
});
