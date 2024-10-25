import {View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {scale, ScaledSheet} from 'react-native-size-matters/extend';
import colorsConstant from '@/constants/colors.constant';
import FastImage from 'react-native-fast-image';
import {useAppSelector} from '@/hooks/redux';
import Typo from '@/components/Typo';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import IconXML from '@/components/IconXML';
import Edit from '@/assets/icons/Edit';

const MyProfile = () => {
  const insets = useSafeAreaInsets();
  const {user_info} = useAppSelector(state => state.my);
  const [imgURI, setImgURI] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleEditProfile = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  return (
    <View style={styles.screen}>
      <View style={[styles.header, {paddingTop: insets.top + scale(12)}]}>
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
        style={[styles.editProfile, {top: insets.top + scale(4)}]}
        onPress={handleEditProfile}
      />
      <View style={styles.listOptions}></View>
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
    paddingTop: '300@vs',
  },
  header: {
    backgroundColor: colorsConstant.primary,
    borderBottomLeftRadius: 9999,
    borderBottomRightRadius: 9999,
    paddingVertical: '32@s',
    width: '150%',
    height: '300@vs',
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
    backgroundColor: 'red',
    padding: '20@s',
  },
  editProfile: {
    position: 'absolute',
    right: '16@s',
    zIndex: 3,
  },
});
