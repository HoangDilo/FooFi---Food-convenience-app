import {View} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import Typo from '@/components/Typo';
import HeaderTab from '@/components/HeaderTab';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setCurrentRoute} from '@/store/reducers/system.reducer';
import {TAB} from '@/constants/tabs.constant';
import IconXML from '@/components/IconXML';
import PlusCircleLine from '@/assets/icons/PlusCircleLine';
import {scale, ScaledSheet} from 'react-native-size-matters/extend';
import {useTranslation} from 'react-i18next';
import colorsConstant from '@/constants/colors.constant';
import {TabView, SceneMap, TabBar, Route} from 'react-native-tab-view';
import RecommendPostsTab from './RecommendPostsTab';
import AllPostsTab from './AllPostsTab';
import OtherChefItemTabBar from '@/components/OtherChefItemTabBar';
import {deviceWidth} from '@/constants/device.constant';

const renderScene = SceneMap({
  recommend: RecommendPostsTab,
  all: AllPostsTab,
});

const OtherChefsScreen = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const [index, setIndex] = useState(0);

  const routes = useMemo<Route[]>(
    () => [
      {
        key: 'recommend',
        title: t('other_chefs.tabs.recommend'),
      },
      {
        key: 'all',
        title: t('other_chefs.tabs.all'),
      },
    ],
    [t],
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(setCurrentRoute(TAB.OTHER_CHEFS));
    }, [dispatch]),
  );

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: colorsConstant.background}}
      edges={['top']}>
      <HeaderTab
        isOrange={false}
        rightIcon={
          <View style={styles.postButton}>
            <IconXML
              icon={PlusCircleLine}
              width={scale(20)}
              height={scale(20)}
            />
            <Typo style={styles.postLabel}>{t('other_chefs.post')}</Typo>
          </View>
        }
      />
      <TabView
        renderScene={renderScene}
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        initialLayout={{
          width: deviceWidth,
        }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{backgroundColor: colorsConstant.primary}}
            pressOpacity={0}
            // renderTabBarItem={tabItemProps => (
            //   <OtherChefItemTabBar {...tabItemProps} />
            // )}
            style={styles.tabBar}
            contentContainerStyle={styles.tabBarContainer}
            activeColor="#f00"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default OtherChefsScreen;

const styles = ScaledSheet.create({
  postButton: {
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: '1.5@s',
    borderColor: colorsConstant.primary,
    paddingHorizontal: '10@s',
    paddingVertical: '4@s',
    gap: '4@s',
    backgroundColor: '#FFF',
  },
  postLabel: {
    color: colorsConstant.primary,
    fontWeight: '500',
    fontSize: '18@s',
  },
  tabBar: {
    backgroundColor: colorsConstant.background,
  },
  tabBarContainer: {
    padding: 12,
    gap: 20,
    justifyContent: 'space-around',
  },
});
