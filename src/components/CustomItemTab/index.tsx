import {Pressable} from 'react-native';
import React from 'react';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import Typo from '../Typo';
import colorsConstant from '@/constants/colors.constant';

import HomeTab from '@/assets/icons/HomeTab';
import OtherChefsTab from '@/assets/icons/OtherChefsTab';
import HomeTabActive from '@/assets/icons/HomeTabActive';
import OtherChefsTabActive from '@/assets/icons/OtherChefsTabActive';
import KitchenTab from '@/assets/icons/KitchenTab';
import KitchenActive from '@/assets/icons/KitchenActive';
import ChatBotTab from '@/assets/icons/ChatBotTab';
import ChatBotActive from '@/assets/icons/ChatBotActive';
import MyTab from '@/assets/icons/MyTab';
import MyTabActive from '@/assets/icons/MyTabActive';
import IconXML from '../IconXML';
import {ScaledSheet} from 'react-native-size-matters/extend';
import {useTranslation} from 'react-i18next';

interface ICustomItemTab {
  isFocused: boolean;
  label: string;
  options: BottomTabNavigationOptions;
  onPress: () => void;
  onLongPress: () => void;
}

const tabIcon = {
  home_tab: {
    default: HomeTab,
    active: HomeTabActive,
    key: 'home',
  },
  other_chefs: {
    default: OtherChefsTab,
    active: OtherChefsTabActive,
    key: 'other_chefs',
  },
  kitchen: {
    default: KitchenTab,
    active: KitchenActive,
    key: 'kitchen',
  },
  chat_bot: {
    default: ChatBotTab,
    active: ChatBotActive,
    key: 'chat_bot',
  },
  my: {
    default: MyTab,
    active: MyTabActive,
    key: 'my',
  },
};

const CustomItemTab = ({
  isFocused,
  label,
  options,
  onPress,
  onLongPress,
}: ICustomItemTab) => {
  const {t} = useTranslation();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={isFocused ? {selected: true} : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabItem}>
      <IconXML
        icon={
          tabIcon[label as keyof typeof tabIcon][
            isFocused ? 'active' : 'default'
          ]
        }
        width={24}
        height={24}
      />
      <Typo
        style={[
          styles.labelItem,
          {
            color: isFocused ? colorsConstant.primary : colorsConstant.gray_1,
          },
        ]}>
        {t(`tabs_name.${tabIcon[label as keyof typeof tabIcon].key}`)}
      </Typo>
    </Pressable>
  );
};

export default CustomItemTab;

const styles = ScaledSheet.create({
  tabItem: {
    alignItems: 'center',
    flex: 1,
    gap: '2@s',
  },
  labelItem: {
    fontSize: '12@s',
    fontWeight: '500',
  },
});
