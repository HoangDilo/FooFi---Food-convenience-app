import React, {useCallback, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {TAB} from '@/constants/tabs.constant';

import HomeScreen from '@/screens/Home';
import OtherChefsScreen from '@/screens/OtherChefs';

import MyScreen from '@/screens/My';
import KitchenScreen from '@/screens/Kitchen';
import ChatBotScreen from '@/screens/ChatBot';
import {MainTabParamList} from '@/types/navigation.type';
import CustomBottomTab from '@/components/CustomBottomTab';
import {useAppSelector} from '@/hooks/redux';
import {EventArg, useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {getAccessToken} from '@/utils/storage';
import {setAccessToken} from '@/store/reducers/my.reducer';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TabNavigator = () => {
  const {access_token} = useAppSelector(state => state.my);
  const navigation = useNavigation();
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const handleCheckToken = useCallback(async () => {
    const token = await getAccessToken();
    dispatch(setAccessToken(token ?? ''));
  }, [dispatch]);

  const handlePressTab = useCallback(
    (event: EventArg<'tabPress', true, undefined>) => {
      if (!access_token) {
        event.preventDefault();
        Toast.show({
          type: 'error',
          text1: t('toast.login'),
          visibilityTime: 3000,
        });
      }
    },
    [access_token, t],
  );

  useEffect(() => {
    navigation.navigate(access_token ? 'home_tab' : 'my');
  }, [access_token, navigation]);

  useEffect(() => {
    handleCheckToken();
  }, [handleCheckToken]);

  return (
    <Tab.Navigator
      tabBar={props => <CustomBottomTab {...props} />}
      screenOptions={() => {
        return {
          headerShown: false,
        };
      }}>
      <Tab.Screen
        name={TAB.HOME_TAB as 'home_tab'}
        component={HomeScreen}
        listeners={{tabPress: handlePressTab}}
      />
      <Tab.Screen
        name={TAB.KITCHEN as 'kitchen'}
        component={KitchenScreen}
        listeners={{tabPress: handlePressTab}}
      />
      <Tab.Screen
        name={TAB.OTHER_CHEFS as 'other_chefs'}
        component={OtherChefsScreen}
        listeners={{tabPress: handlePressTab}}
      />
      <Tab.Screen
        name={TAB.CHAT_BOT as 'chat_bot'}
        component={ChatBotScreen}
        listeners={{tabPress: handlePressTab}}
      />
      <Tab.Screen name={TAB.MY as 'my'} component={MyScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
