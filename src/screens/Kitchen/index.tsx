import {View} from 'react-native';
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
      {/* <ScrollView> */}
      <View style={styles.kitchenScreen}>
        <Typo style={styles.description}>{t('kitchen.title')}</Typo>
        <KitchenTools />
        <KitchenSpices />
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default KitchenScreen;

const styles = ScaledSheet.create({
  kitchenScreen: {
    flex: 1,
    backgroundColor: colorsConstant.background,
    padding: '24@s',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    gap: '20@s',
  },
  description: {
    color: colorsConstant.gray_1,
    fontSize: '16@s',
    fontWeight: '500',
    marginLeft: '4@s',
    fontStyle: 'italic',
  },
});
