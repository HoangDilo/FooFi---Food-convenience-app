import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from 'react-native';
import React, {useCallback, useRef} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import colorsConstant from '@/constants/colors.constant';
import HeaderTab from '@/components/HeaderTab';
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

const KitchenScreen = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();

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

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.kitchenScreen}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      onScroll={event => handleScroll(event)}>
      <HeaderTab
        stylesCustom={{paddingTop: insets.top + scale(16)}}
        rightIcon={
          <IconXML
            icon={QuestionCircle}
            width={scale(36)}
            height={scale(36)}
            onPress={handlePressQuestionMark}
          />
        }
      />
      <View style={styles.scrollViewWrapper}>
        <Typo style={styles.description}>{t('kitchen.title')}</Typo>
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
    marginTop: '12@s',
    padding: '24@s',
  },
  scrollView: {
    backgroundColor: colorsConstant.background,
  },
  kitchenScreen: {
    backgroundColor: colorsConstant.primary,
  },
  description: {
    color: colorsConstant.gray_1,
    fontSize: '16@s',
    fontWeight: '500',
    marginLeft: '4@s',
    fontStyle: 'italic',
    marginBottom: '8@s',
  },
});
