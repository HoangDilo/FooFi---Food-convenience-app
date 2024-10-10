import {View} from 'react-native';
import React from 'react';
import {scale, ScaledSheet} from 'react-native-size-matters/extend';
import Typo from '@/components/Typo';
import {ISpice} from '@/types/kitchen.type';
import FastImage from 'react-native-fast-image';
import {useTranslation} from 'react-i18next';
import colorsConstant from '@/constants/colors.constant';
import IconXML from '@/components/IconXML';
import XBlack2 from '@/assets/icons/XBlack2';

interface IItemSpiceDisplayProps {
  spice: ISpice;
  onRemoveSpice: () => void;
}

const ItemSpiceDisplay = ({spice, onRemoveSpice}: IItemSpiceDisplayProps) => {
  const {i18n} = useTranslation();

  return (
    <View style={styles.toolItem}>
      <FastImage source={{uri: spice.img_url}} style={styles.toolImg} />
      <Typo style={styles.toolName}>
        {spice[`name_${i18n.language}` as keyof ISpice]}
      </Typo>
      <IconXML
        icon={XBlack2}
        width={scale(16)}
        height={scale(16)}
        onPress={onRemoveSpice}
      />
    </View>
  );
};

export default ItemSpiceDisplay;

const styles = ScaledSheet.create({
  toolImg: {
    width: '32@s',
    height: '32@s',
    borderRadius: 999,
  },
  toolItem: {
    flexDirection: 'row',
    borderRadius: 999,
    gap: '6@s',
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingVertical: '6@s',
    paddingLeft: '6@s',
    paddingRight: '12@s',
    shadowColor: colorsConstant.shadow,
    elevation: 4,
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
  toolName: {
    color: colorsConstant.black_2,
    marginRight: '4@s',
  },
});
