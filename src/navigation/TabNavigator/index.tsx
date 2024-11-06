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
import {setAccessToken, setUserInfo} from '@/store/reducers/my.reducer';
import {useCheckValidToken} from '@/api/hooks/useAuth';
import authService from '@/api/services/auth.service';
import FastImage from 'react-native-fast-image';
import {isValidUri} from '@/utils/image';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TabNavigator = () => {
  const {access_token} = useAppSelector(state => state.my);
  const navigation = useNavigation();
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const getUserInfoCheckLogin = useCheckValidToken(authService.getUserInfo);

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

  const handleGetUserInfo = useCallback(async () => {
    try {
      const userInfo = await getUserInfoCheckLogin();
      i18n.changeLanguage(userInfo.language);
      dispatch(setUserInfo(userInfo));
      isValidUri(userInfo.avatar_url) &&
        FastImage.preload([
          {
            uri: userInfo.avatar_url,
          },
        ]);
    } catch (error) {
      console.log('userinfo error', error);
    }
  }, [dispatch, getUserInfoCheckLogin, i18n]);

  useEffect(() => {
    navigation.navigate(access_token ? 'home_tab' : 'my');
  }, [access_token, navigation]);

  useEffect(() => {
    handleCheckToken();
  }, [handleCheckToken]);

  useEffect(() => {
    if (access_token) {
      handleGetUserInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access_token]);

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
