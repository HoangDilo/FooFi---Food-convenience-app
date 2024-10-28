import {Pressable, ScrollView, View} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {scale, ScaledSheet} from 'react-native-size-matters/extend';
import colorsConstant from '@/constants/colors.constant';
import FastImage from 'react-native-fast-image';
import {useAppSelector} from '@/hooks/redux';
import Typo from '@/components/Typo';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import IconXML from '@/components/IconXML';
import Edit from '@/assets/icons/Edit';
import ModalEditProfile from '@/components/ModalEditProfile';
import {useTranslation} from 'react-i18next';
import CaretRightBlack from '@/assets/icons/CaretRightBlack';
import HeartFillBlack from '@/assets/icons/HeartFillBlack';
import Post from '@/assets/icons/Post';
import {useNavigation} from '@react-navigation/native';
import Language from '@/assets/icons/Language';
import {LANGUAGE} from '@/constants/language.constant';
import Password from '@/assets/icons/Password';
import Logout from '@/assets/icons/Logout';
import {useDispatch} from 'react-redux';
import {setAccessToken} from '@/store/reducers/my.reducer';
import {setAccessTokenStorage} from '@/utils/storage';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {Easing} from 'react-native-reanimated';
import {setIsBottomSheetShowing} from '@/store/reducers/system.reducer';
import {deviceHeight} from '@/constants/device.constant';
import CheckOrange from '@/assets/icons/CheckOrange';

const HISTORIES = [
  {
    label: 'like_history',
    icon: HeartFillBlack,
    type: 'like',
  },
  {
    label: 'post_history',
    icon: Post,
    type: 'post',
  },
];

const MyProfile = () => {
  const {t, i18n} = useTranslation();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const {user_info} = useAppSelector(state => state.my);
  const dispatch = useDispatch();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isShowBottomSheet, setIsShowBottomSheet] = useState(false);

  const bottomSheetRef = useRef<BottomSheet | null>(null);

  const snapPoints = useMemo(() => [160 + insets.bottom], [insets.bottom]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.2}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        style={{backgroundColor: 'black'}}
      />
    ),
    [],
  );

  const handleChangeBS = useCallback(
    (index: number) => {
      dispatch(setIsBottomSheetShowing(index !== -1));
      setTimeout(() => {
        setIsShowBottomSheet(index !== -1);
      }, 200);
    },
    [dispatch],
  );

  const handleEditProfile = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const handlePressHistory = useCallback(
    (type: 'like' | 'post') => {
      navigation.navigate('history', {type});
    },
    [navigation],
  );

  const handlePressLanguage = useCallback(() => {
    dispatch(setIsBottomSheetShowing(true));
    setIsShowBottomSheet(true);
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(setAccessToken(''));
    setAccessTokenStorage('');
  }, [dispatch]);

  const handleChangeLanguage = useCallback(
    (language: string) => {
      i18n.changeLanguage(language);
      bottomSheetRef?.current?.close();
    },
    [i18n],
  );

  const handlePressChangePassword = useCallback(() => {}, []);

  return (
    <View style={{flex: 1, position: 'relative'}}>
      <ScrollView
        contentContainerStyle={styles.screen}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={[styles.header, {paddingTop: insets.top + scale(20)}]}>
          <FastImage
            source={{uri: user_info.avatar_url}}
            style={styles.avatar}
          />
          <Typo style={styles.name}>{user_info.name}</Typo>
          <Typo style={styles.email}>{user_info.email}</Typo>
        </View>
        <IconXML
          icon={Edit}
          width={scale(36)}
          height={scale(36)}
          style={[styles.editProfile, {top: insets.top + scale(20)}]}
          onPress={handleEditProfile}
        />
        <View style={styles.listOptions}>
          <Typo style={styles.titleOptions}>{t('my.history')}</Typo>
          {HISTORIES.map((item, index) => (
            <Pressable
              style={styles.itemOptions}
              key={index}
              onPress={() => handlePressHistory(item.type as any)}>
              <IconXML
                icon={item.icon}
                width={scale(28)}
                height={scale(28)}
                style={styles.optionIcon}
              />
              <Typo style={styles.labelOption}>{t(`my.${item.label}`)}</Typo>
              <IconXML
                icon={CaretRightBlack}
                width={scale(28)}
                height={scale(28)}
                style={styles.iconCaret}
              />
            </Pressable>
          ))}
          <Typo style={styles.titleOptions}>{t('my.settings')}</Typo>
          <Pressable style={styles.itemOptions} onPress={handlePressLanguage}>
            <IconXML
              icon={Language}
              width={scale(28)}
              height={scale(28)}
              style={styles.optionIcon}
            />
            <Typo style={styles.labelOption}>{t('my.language')}</Typo>
            <IconXML
              icon={LANGUAGE.find(lang => lang.key === i18n.language)?.icon}
              width={scale(28)}
              height={scale(28)}
              style={styles.iconCaret}
            />
          </Pressable>
          <Typo style={styles.titleOptions}>{t('my.privacy')}</Typo>
          <Pressable
            style={styles.itemOptions}
            onPress={handlePressChangePassword}>
            <IconXML
              icon={Password}
              width={scale(28)}
              height={scale(28)}
              style={styles.optionIcon}
            />
            <Typo style={styles.labelOption}>{t('my.change_password')}</Typo>
          </Pressable>
          <Pressable
            style={[styles.itemOptions, {marginTop: scale(12)}]}
            onPress={handleLogout}>
            <IconXML
              icon={Logout}
              width={scale(28)}
              height={scale(28)}
              style={styles.optionIcon}
            />
            <Typo style={[styles.labelOption, {color: colorsConstant.error}]}>
              {t('my.log_out')}
            </Typo>
          </Pressable>
        </View>
        <ModalEditProfile
          isVisible={isOpenModal}
          onClose={() => setIsOpenModal(false)}
        />
      </ScrollView>
      {isShowBottomSheet && (
        <View style={styles.bottomSheetContainer}>
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            animationConfigs={{
              duration: 200,
              easing: Easing.inOut(Easing.quad),
            }}
            handleIndicatorStyle={{backgroundColor: colorsConstant.secondary}}
            onChange={index => handleChangeBS(index)}
            style={styles.bottomSheetView}
            containerHeight={136}
            enablePanDownToClose>
            {LANGUAGE.map(lang => (
              <Pressable
                key={lang.key}
                style={styles.language}
                onPress={() => handleChangeLanguage(lang.key)}>
                <IconXML
                  icon={lang.icon}
                  width={scale(36)}
                  height={scale(36)}
                />
                <Typo style={styles.langLabel}>
                  {t(`languages.${lang.key}`)}
                </Typo>
                {i18n.language === lang.key && (
                  <IconXML
                    icon={CheckOrange}
                    width={scale(32)}
                    height={scale(32)}
                  />
                )}
              </Pressable>
            ))}
          </BottomSheet>
        </View>
      )}
    </View>
  );
};

export default MyProfile;

const styles = ScaledSheet.create({
  screen: {
    backgroundColor: '#FFF',
    position: 'relative',
    alignItems: 'center',
    paddingTop: '260@vs',
  },
  header: {
    backgroundColor: colorsConstant.primary,
    borderBottomLeftRadius: 9999,
    borderBottomRightRadius: 9999,
    paddingVertical: '32@s',
    width: '150%',
    height: '260@vs',
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  avatar: {
    width: '100@s',
    height: '100@s',
    borderRadius: 999,
    marginBottom: '8@s',
  },
  name: {
    fontSize: '28@s',
    fontWeight: '700',
    color: '#FFF',
  },
  email: {
    color: '#FFF',
    fontWeight: '500',
    fontSize: '16@s',
  },
  listOptions: {
    padding: '20@s',
    alignSelf: 'flex-start',
    width: '100%',
    gap: '14@s',
  },
  titleOptions: {
    fontSize: '20@s',
    fontWeight: '700',
    color: colorsConstant.black_1,
    marginTop: '12@s',
  },
  itemOptions: {
    borderRadius: '8@s',
    backgroundColor: '#FFF',
    shadowColor: colorsConstant.shadow_2,
    elevation: 4,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    padding: '16@s',
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    marginRight: '12@s',
  },
  labelOption: {
    fontSize: '18@s',
    fontWeight: '500',
    color: colorsConstant.black_2,
  },
  iconCaret: {
    marginLeft: 'auto',
  },
  editProfile: {
    position: 'absolute',
    right: '16@s',
    zIndex: 3,
  },
  logout: {
    marginTop: '20@s',
    flexDirection: 'row',
    padding: '16@s',
    borderWidth: '1@s',
    borderColor: colorsConstant.error,
    borderRadius: '8@s',
  },
  bottomSheetContainer: {
    position: 'absolute',
    zIndex: 3,
    flex: 1,
    width: '100%',
    height: deviceHeight,
    bottom: 0,
  },
  bottomSheetView: {
    paddingHorizontal: '24@s',
    borderRadius: '20@s',
    overflow: 'hidden',
  },
  language: {
    flexDirection: 'row',
    padding: '12@s',
    alignItems: 'center',
  },
  langLabel: {
    color: colorsConstant.black_2,
    fontWeight: '500',
    fontSize: '16@s',
    marginLeft: '12@s',
    marginRight: 'auto',
  },
});
