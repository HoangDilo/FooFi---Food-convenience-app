import {BackHandler, Pressable, ScrollView, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Typo from '@/components/Typo';
import {scale, ScaledSheet} from 'react-native-size-matters/extend';
import colorsConstant from '@/constants/colors.constant';
import {useTranslation} from 'react-i18next';
import SignIn from './SignIn';
import SignUp from './SignUp';
import IconXML from '@/components/IconXML';
import Google from '@/assets/icons/Google';
import {useAppSelector} from '@/hooks/redux';

const Authentication = () => {
  const {t} = useTranslation();
  const {access_token} = useAppSelector(state => state.my);

  const [isLogin, setIsLogin] = useState(true);

  const handleSwitchSignUp = useCallback(() => {
    setIsLogin(!isLogin);
  }, [isLogin]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return !access_token;
      },
    );

    return () => backHandler.remove();
  }, [access_token]);

  return (
    <ScrollView
      style={styles.container}
      scrollEnabled={false}
      keyboardShouldPersistTaps="handled">
      <View style={styles.titleBox}>
        <Typo style={styles.title}>
          {t(isLogin ? 'my.sign_in' : 'my.sign_up')}
        </Typo>
        <Typo style={styles.description}>
          {t(isLogin ? 'my.sign_in_description' : 'my.sign_up_description')}
        </Typo>
      </View>
      <View style={styles.floatView}>
        {isLogin ? <SignIn /> : <SignUp />}
        <View style={styles.googleSignIn}>
          <View style={styles.orWrapper}>
            <View style={styles.line} />
            <Typo style={styles.or}>{t('my.or')}</Typo>
            <View style={styles.line} />
          </View>
          <Pressable style={styles.googleButton}>
            <IconXML icon={Google} width={scale(32)} height={scale(32)} />
            <Typo style={styles.googleText}>{t('my.sign_in_google')}</Typo>
          </Pressable>
        </View>
        <Typo style={styles.dontHaveAccount}>
          {t(isLogin ? 'my.dont_have_account' : 'my.already_have_account')}{' '}
          <Typo style={styles.createAccount} onPress={handleSwitchSignUp}>
            {t(isLogin ? 'my.create_account' : 'my.sign_in')}
          </Typo>
        </Typo>
      </View>
    </ScrollView>
  );
};

export default Authentication;

const styles = ScaledSheet.create({
  container: {
    backgroundColor: colorsConstant.background,
  },
  titleBox: {
    backgroundColor: colorsConstant.primary,
    borderBottomRightRadius: '20@s',
    paddingVertical: '20@s',
    height: '240@vs',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: '100@s',
  },
  title: {
    fontWeight: '700',
    color: '#FFF',
    fontSize: '28@s',
  },
  description: {
    fontWeight: '500',
    color: '#FFF',
    fontSize: '16@s',
  },
  floatView: {
    transform: [
      {
        translateY: -68,
      },
    ],
    alignItems: 'center',
  },
  googleSignIn: {
    marginTop: '20@s',
    width: '82%',
  },
  or: {
    color: colorsConstant.gray_2,
    fontSize: '16@s',
    fontWeight: '500',
    marginHorizontal: '8@s',
  },
  line: {
    backgroundColor: colorsConstant.skeleton_1,
    height: '1@s',
    flex: 1,
  },
  orWrapper: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  googleButton: {
    borderWidth: '1@s',
    borderColor: colorsConstant.primary,
    borderRadius: 999,
    paddingHorizontal: '6@s',
    paddingVertical: '8@s',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '16@s',
    alignItems: 'center',
    gap: '12@s',
    backgroundColor: colorsConstant.primary_fade,
    marginHorizontal: '20@s',
  },
  googleText: {
    fontSize: '18@s',
    color: '#000',
    fontWeight: '500',
  },
  dontHaveAccount: {
    marginTop: '24@s',
    color: colorsConstant.black_2,
  },
  createAccount: {
    color: colorsConstant.primary,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
});
