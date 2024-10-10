import {View} from 'react-native';
import React, {useCallback} from 'react';
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

const OtherChefsScreen = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

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
      <View>
        
      </View>
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
});
