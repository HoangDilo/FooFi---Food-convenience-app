import {View} from 'react-native';
import React from 'react';
import {scale, ScaledSheet} from 'react-native-size-matters/extend';
import Typo from '@/components/Typo';
import {IKitchenToolsAvailable} from '@/types/kitchen.type';
import FastImage from 'react-native-fast-image';
import {useTranslation} from 'react-i18next';
import colorsConstant from '@/constants/colors.constant';
import IconXML from '@/components/IconXML';
import XBlack2 from '@/assets/icons/XBlack2';

interface IItemToolDisplayProps {
  tool: IKitchenToolsAvailable;
  onRemoveTool: () => void;
}

const ItemToolDisplay = ({tool, onRemoveTool}: IItemToolDisplayProps) => {
  const {i18n} = useTranslation();

  return (
    <View style={styles.toolItem}>
      <FastImage source={{uri: tool.img_url}} style={styles.toolImg} />
      <Typo style={styles.toolName}>
        {tool[`name_${i18n.language}` as keyof IKitchenToolsAvailable]}
      </Typo>
      <IconXML
        icon={XBlack2}
        width={scale(16)}
        height={scale(16)}
        onPress={onRemoveTool}
      />
    </View>
  );
};

export default ItemToolDisplay;

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
