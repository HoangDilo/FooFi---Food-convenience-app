import {Animated, Easing, StyleSheet, Text, View} from 'react-native';
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
import {MainTabParamList} from '@/types/navigation.type';
import {useAppSelector} from '@/hooks/redux';
import {useEffect, useRef} from 'react';

const Tab = createBottomTabNavigator<MainTabParamList>();

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
  const {isBottomTabHidden} = useAppSelector(state => state.system);
  const hideAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (hideAnimation) {
      Animated.timing(hideAnimation, {
        toValue: 0,
        easing: Easing.linear,
        useNativeDriver: true,
        duration: 1000,
      }).start();
    }
  }, [isBottomTabHidden]);

  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: '#FFF'}}
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
          tabBarStyle: [
            styles.tabBarStyle,
            {display: isBottomTabHidden ? 'none' : 'flex'},
          ],
          tabBarItemStyle: styles.tabBarItem,
          tabBarLabelStyle: styles.labelItem,
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

const styles = StyleSheet.create({
  tabBarStyle: {
    borderTopWidth: 1,
    borderTopColor: colorsConstant.gray_3,
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
  labelItem: {
    fontSize: 12,
    fontWeight: 500,
  },
});
