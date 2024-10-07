import {View} from 'react-native';
import React, {useCallback} from 'react';
import {scale, ScaledSheet} from 'react-native-size-matters/extend';
import Typo from '@/components/Typo';
import {IKitchenToolsAvailable} from '@/types/kitchen.type';
import FastImage from 'react-native-fast-image';
import {useTranslation} from 'react-i18next';
import colorsConstant from '@/constants/colors.constant';
import IconXML from '@/components/IconXML';
import X from '@/assets/icons/X';

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
        icon={X}
        width={scale(24)}
        height={scale(24)}
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
    paddingRight: '8@s',
    shadowColor: colorsConstant.shadow,
    elevation: 4,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    borderWidth: '1@s',
    borderColor: colorsConstant.primary,
  },
  toolName: {
    color: colorsConstant.primary,
    marginRight: '4@s',
  },
});
