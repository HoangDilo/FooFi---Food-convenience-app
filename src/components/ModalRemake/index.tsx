import React from 'react';
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
      useNativeDriver={true}>
      {children}
    </Modal>
  );
};

export default ModalRemake;
