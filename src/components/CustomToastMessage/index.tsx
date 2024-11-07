import {View} from 'react-native';
import Toast, {ToastConfig} from 'react-native-toast-message';

import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScaledSheet} from 'react-native-size-matters/extend';
import IconXML from '../IconXML';
import Success from '@/assets/icons/Success';
import Typo from '../Typo';
import colorsConstant from '@/constants/colors.constant';
import Error from '@/assets/icons/Error';

const toastConfig: ToastConfig = {
  success: props => (
    <View style={[styles.toastSucess, styles.toastContainer]}>
      <IconXML icon={Success} width={24} height={24} />
      <Typo style={styles.toastSucessText}>{props.text1}</Typo>
    </View>
  ),
  error: props => (
    <View style={[styles.toastError, styles.toastContainer]}>
      <IconXML icon={Error} width={24} height={24} />
      <Typo style={styles.toastErrorText}>{props.text1}</Typo>
    </View>
  ),
};

const CustomToastMessage = () => {
  const insets = useSafeAreaInsets();

  return (
    <Toast
      position="bottom"
      bottomOffset={insets.bottom + 64}
      config={toastConfig}
      visibilityTime={5000}
    />
  );
};

export default CustomToastMessage;

const styles = ScaledSheet.create({
  toastContainer: {
    overflow: 'hidden',
    borderRadius: '8@s',
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '16@s',
    paddingVertical: '12@s',
    gap: '12@s',
    borderWidth: 1.5,
  },
  toastSucess: {
    backgroundColor: '#f0fff4DD',
    borderColor: colorsConstant.success,
  },
  toastError: {
    backgroundColor: '#ffdedeAA',
    borderColor: colorsConstant.error,
  },
  toastSucessText: {
    fontWeight: '500',
    fontSize: '16@s',
    color: colorsConstant.success,
    flex: 1,
  },
  toastErrorText: {
    fontWeight: '500',
    fontSize: '16@s',
    color: colorsConstant.error,
    flex: 1,
  },
});
