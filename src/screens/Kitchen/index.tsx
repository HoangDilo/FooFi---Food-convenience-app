import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import colorsConstant from '@/constants/colors.constant';
import {setCurrentRoute, setIsScrolling} from '@/store/reducers/system.reducer';
import {TAB} from '@/constants/tabs.constant';
import {scale, ScaledSheet} from 'react-native-size-matters/extend';
import KitchenTools from './KitchenTools';
import KitchenSpices from './KitchenSpices';
import Typo from '@/components/Typo';
import {useTranslation} from 'react-i18next';
import IconXML from '@/components/IconXML';
import QuestionCircle from '@/assets/icons/QuestionCircle';
import KitchenIngredients from './KitchenIngredients';
import FastImage from 'react-native-fast-image';
import {deviceWidth} from '@/constants/device.constant';
import {useQueryClient} from '@tanstack/react-query';
import {useAppSelector} from '@/hooks/redux';

const KitchenScreen = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {access_token} = useAppSelector(state => state.my);
  const queryClient = useQueryClient();

  const contentOffsetY = useRef<number>(0);

  const handlePressQuestionMark = useCallback(() => {}, []);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      contentOffsetY.current = event.nativeEvent.contentOffset.y;
      if (event.nativeEvent.contentOffset.y > 120) {
        dispatch(setIsScrolling(true));
      } else {
        dispatch(setIsScrolling(false));
      }
    },
    [dispatch],
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(setIsScrolling(contentOffsetY.current > 120));
      dispatch(setCurrentRoute(TAB.KITCHEN));
    }, [dispatch]),
  );

  useEffect(() => {
    queryClient.refetchQueries({queryKey: ['list_tools']});
    queryClient.refetchQueries({queryKey: ['list_spices']});
    queryClient.refetchQueries({queryKey: ['list_ingredients']});
    queryClient.refetchQueries({queryKey: ['user_tools']});
  }, [queryClient, access_token]);

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.kitchenScreen}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      onScroll={event => handleScroll(event)}>
      <View style={styles.headerContainer}>
        <FastImage
          source={require('@/assets/images/kitchen.jpg')}
          style={styles.headerImg}
          resizeMode="cover"
        />
        <View style={styles.headerContentWrapper}>
          <View style={styles.headerContent}>
            <View style={{flex: 1}}>
              <Typo style={styles.headerTitle}>{t('tabs_name.kitchen')}</Typo>
              <Typo style={styles.description}>{t('kitchen.title')}</Typo>
            </View>
            <IconXML
              icon={QuestionCircle}
              width={scale(40)}
              height={scale(40)}
              style={styles.questionMark}
            />
          </View>
        </View>
      </View>
      <View style={styles.scrollViewWrapper}>
        <KitchenTools />
        <KitchenSpices />
        <KitchenIngredients />
      </View>
    </ScrollView>
  );
};

export default KitchenScreen;

const styles = ScaledSheet.create({
  scrollViewWrapper: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flex: 1,
    overflow: 'hidden',
    backgroundColor: colorsConstant.background,
    paddingHorizontal: '24@s',
    paddingVertical: '26@s',
    transform: [
      {
        translateY: -16,
      },
    ],
  },
  scrollView: {
    backgroundColor: colorsConstant.background,
  },
  kitchenScreen: {},
  description: {
    color: '#FFF',
    fontSize: '16@s',
    fontWeight: '500',
    marginLeft: '4@s',
    fontStyle: 'italic',
    marginBottom: '8@s',
  },
  headerImg: {
    height: '200@vs',
    width: deviceWidth,
  },
  headerContainer: {
    position: 'relative',
  },
  headerContentWrapper: {
    backgroundColor: '#00000088',
    position: 'absolute',
    width: deviceWidth,
    height: '200@vs',
    justifyContent: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: '24@s',
  },
  headerTitle: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: '28@s',
  },
  questionMark: {
    marginLeft: '80@s',
  },
});
