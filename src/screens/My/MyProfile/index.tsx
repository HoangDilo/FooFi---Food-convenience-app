import {Pressable, View} from 'react-native';
import React, {useCallback, useState} from 'react';
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

  const [imgURI, setImgURI] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleEditProfile = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const handlePressHistory = useCallback(
    (type: 'like' | 'post') => {
      navigation.navigate('history', {type});
    },
    [navigation],
  );

  const handlePressLanguage = useCallback(() => {}, []);

  return (
    <View style={styles.screen}>
      <View style={[styles.header, {paddingTop: insets.top + scale(20)}]}>
        <FastImage
          source={{uri: imgURI ? imgURI : user_info.avatar_url}}
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
            icon={LANGUAGE[i18n.language as keyof typeof LANGUAGE]}
            width={scale(28)}
            height={scale(28)}
            style={styles.iconCaret}
          />
        </Pressable>
        <Typo style={styles.titleOptions}>{t('my.privacy')}</Typo>
        <Pressable style={styles.itemOptions} onPress={handlePressLanguage}>
          <IconXML
            icon={Language}
            width={scale(28)}
            height={scale(28)}
            style={styles.optionIcon}
          />
          <Typo style={styles.labelOption}>{t('my.language')}</Typo>
        </Pressable>
      </View>
      <ModalEditProfile
        isVisible={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
    </View>
  );
};

export default MyProfile;

const styles = ScaledSheet.create({
  screen: {
    backgroundColor: colorsConstant.background,
    flex: 1,
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
    color: colorsConstant.black_1,
  },
  iconCaret: {
    marginLeft: 'auto',
  },
  editProfile: {
    position: 'absolute',
    right: '16@s',
    zIndex: 3,
  },
});
