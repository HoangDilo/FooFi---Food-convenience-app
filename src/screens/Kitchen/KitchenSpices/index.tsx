import {View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {scale, ScaledSheet} from 'react-native-size-matters/extend';
import Typo from '@/components/Typo';
import colorsConstant from '@/constants/colors.constant';
import {useTranslation} from 'react-i18next';
import IconXML from '@/components/IconXML';
import {ISpice} from '@/types/kitchen.type';
import ItemSpiceDisplay from './ItemSpiceDisplay';
import ModalAddKitchenSpices from '@/components/ModalAddKitchenSpices';
import {useKitchenSpice} from '@/api/hooks/useKitchen';
import {deviceWidth} from '@/constants/device.constant';
import FastImage from 'react-native-fast-image';
import PlusWhite from '@/assets/icons/PlusWhite';

const KitchenSpices = () => {
  const {t} = useTranslation();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const {data: listSpices, isPending} = useKitchenSpice();

  const handleAddListSpice = useCallback((listSpicesAdd: ISpice[]) => {}, []);

  const handleAddSpice = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const handleRemoveSpice = useCallback((id: number) => {}, []);

  const handleCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Typo style={styles.headerLabel}>{t('kitchen.kitchen_spices')}</Typo>
        <IconXML
          icon={PlusWhite}
          width={32}
          height={32}
          onPress={handleAddSpice}
        />
        <FastImage
          source={require('@/assets/images/kitchenspice.jpeg')}
          style={styles.backgroundImg}
        />
        <View style={styles.blackCover} />
      </View>
      {data?.length ? (
        <View style={styles.spicesDisplayContainer}>
          {data.map(spice => (
            <ItemSpiceDisplay
              key={spice.id}
              spice={spice}
              onRemoveSpice={() => handleRemoveSpice(spice.id)}
            />
          ))}
        </View>
      ) : (
        <Typo style={styles.emptySpices}>{t('kitchen.empty_spice')}</Typo>
      )}
      <ModalAddKitchenSpices
        isVisible={isOpenModal}
        listSpices={listSpices}
        onSubmit={handleAddListSpice}
        onClose={handleCloseModal}
      />
    </View>
  );
};

export default KitchenSpices;

const styles = ScaledSheet.create({
  container: {},
  header: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#FFF',
    borderRadius: '16@s',
    paddingVertical: '12@s',
    paddingHorizontal: '18@s',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: colorsConstant.shadow,
    elevation: 4,
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
  headerLabel: {
    fontSize: '20@s',
    fontWeight: '600',
    color: '#FFF',
  },
  emptySpices: {
    fontSize: '14@s',
    color: colorsConstant.gray_2,
    marginTop: '8@s',
    textAlign: 'right',
    paddingHorizontal: '8@s',
  },
  spicesDisplayContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: '12@s',
    columnGap: '8@s',
    paddingVertical: '16@s',
    paddingHorizontal: '4@s',
  },
  backgroundImg: {
    height: '60@s',
    width: deviceWidth - 2 * scale(24),
    position: 'absolute',
    top: 0,
    zIndex: -1,
  },
  blackCover: {
    backgroundColor: '#00000060',
    position: 'absolute',
    height: '60@s',
    width: deviceWidth - 2 * scale(24),
    zIndex: -1,
  },
});
