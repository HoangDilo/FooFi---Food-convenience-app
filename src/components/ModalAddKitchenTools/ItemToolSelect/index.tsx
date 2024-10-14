import {Pressable} from 'react-native';
import React, {memo, useCallback, useState} from 'react';
import FastImage from 'react-native-fast-image';
import Typo from '@/components/Typo';
import {IKitchenToolsAvailable} from '@/types/kitchen.type';
import {ScaledSheet} from 'react-native-size-matters/extend';
import colorsConstant from '@/constants/colors.constant';
import {useTranslation} from 'react-i18next';

interface IItemToolSelect {
  tool: IKitchenToolsAvailable;
  isActive?: boolean;
  onSelectTool: () => void;
  onUnselectTool: () => void;
}

const ItemToolSelect = ({
  tool,
  isActive = false,
  onSelectTool,
  onUnselectTool,
}: IItemToolSelect) => {
  const {i18n} = useTranslation();

  const [isSelected, setIsSelected] = useState(isActive);

  const handlePressItem = useCallback(() => {
    setIsSelected(!isSelected);
    if (!isSelected) {
      onSelectTool();
    } else {
      onUnselectTool();
    }
  }, [isSelected, onSelectTool, onUnselectTool]);

  return (
    <Pressable
      style={[styles.toolItem, isSelected && styles.selected]}
      onPress={handlePressItem}>
      <FastImage source={{uri: tool.img_url}} style={styles.toolImg} />
      <Typo style={isSelected ? styles.selectedName : styles.toolName}>
        {tool[`name_${i18n.language}` as keyof typeof tool]}
      </Typo>
    </Pressable>
  );
};

export default memo(ItemToolSelect);

const styles = ScaledSheet.create({
  toolImg: {
    width: '32@s',
    height: '32@s',
    borderRadius: 999,
  },
  selected: {
    borderWidth: '1@s',
    borderColor: colorsConstant.primary,
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
    shadowColor: colorsConstant.shadow_2,
    elevation: 4,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    borderWidth: '1@s',
    borderColor: '#FFF',
  },
  toolName: {
    color: colorsConstant.gray_1,
  },
  selectedName: {
    color: colorsConstant.primary,
  },
});
