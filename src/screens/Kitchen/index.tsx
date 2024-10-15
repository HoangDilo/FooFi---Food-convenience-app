import {ScrollView, View} from 'react-native';
import React, {useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import colorsConstant from '@/constants/colors.constant';
import HeaderTab from '@/components/HeaderTab';
import {setCurrentRoute} from '@/store/reducers/system.reducer';
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

  const handlePressQuestionMark = useCallback(() => {}, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(setCurrentRoute(TAB.KITCHEN));
    }, [dispatch]),
  );

  return (
    <SafeAreaView
      edges={['top']}
      style={{flex: 1, backgroundColor: colorsConstant.primary}}>
      <HeaderTab
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
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.kitchenScreen}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <Typo style={styles.description}>{t('kitchen.title')}</Typo>
          <KitchenTools />
          <KitchenSpices />
          <KitchenIngredients />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default KitchenScreen;

const styles = ScaledSheet.create({
  scrollViewWrapper: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flex: 1,
    overflow: 'hidden',
    marginTop: '14@s',
  },
  scrollView: {
    backgroundColor: colorsConstant.background,
  },
  kitchenScreen: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: '24@s',
    gap: '12@s',
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
