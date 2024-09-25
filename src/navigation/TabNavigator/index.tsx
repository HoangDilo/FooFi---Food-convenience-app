import {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useAppSelector} from '@/hooks/redux';

import {TAB} from '@/constants/tabs.constant';

import HomeScreen from '@/screens/Home';
import OtherChefsScreen from '@/screens/OtherChefs';
import IconXML from '@/components/IconXML';

import MyScreen from '@/screens/My';
import KitchenScreen from '@/screens/Kitchen';
import ChatBotScreen from '@/screens/ChatBot';
import colorsConstant from '@/constants/colors.constant';
import {MainTabParamList} from '@/types/navigation.type';
import CustomBottomTab from '@/components/CustomBottomTab';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TabNavigator = () => {
  const {isBottomTabHidden, isBottomSheetShowing} = useAppSelector(
    state => state.system,
  );

  const isHideBottomTab = useMemo(
    () => isBottomTabHidden || isBottomSheetShowing,
    [isBottomTabHidden, isBottomSheetShowing],
  );

  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: '#FFF'}}
      tabBar={props => <CustomBottomTab {...props} />}
      screenOptions={() => {
        return {
          headerShown: false,
          tabBarStyle: [
            styles.tabBarStyle,
            {display: isHideBottomTab ? 'none' : 'flex'},
          ],
          tabBarItemStyle: styles.tabBarItem,
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
});
