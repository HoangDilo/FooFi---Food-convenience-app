import {deviceHeight, deviceWidth} from '@/constants/device.constant';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';

interface IModalRemakePropse {
  isVisible: boolean;
  children: React.ReactNode;
}

const ModalRemake = ({isVisible, children}: IModalRemakePropse) => {
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.3}
      coverScreen={true}
      statusBarTranslucent
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      hideModalContentWhileAnimating={true}
      useNativeDriver={true}
      deviceHeight={deviceHeight}
      deviceWidth={deviceWidth}>
      {children}
    </Modal>
  );
};

export default ModalRemake;
