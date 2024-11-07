import {Pressable} from 'react-native';
import React, {memo, useCallback, useState} from 'react';
import FastImage from 'react-native-fast-image';
import Typo from '@/components/Typo';
import {ISpice} from '@/types/kitchen.type';
import {ScaledSheet} from 'react-native-size-matters/extend';
import colorsConstant from '@/constants/colors.constant';
import {useTranslation} from 'react-i18next';

interface IItemSpiceSelect {
  spice: ISpice;
  isActive?: boolean;
  onSelectSpice: () => void;
  onUnselectSpice: () => void;
}

const ItemSpiceSelect = ({
  spice,
  isActive = false,
  onSelectSpice,
  onUnselectSpice,
}: IItemSpiceSelect) => {
  const {i18n} = useTranslation();

  const [isSelected, setIsSelected] = useState(isActive);

  const handlePressItem = useCallback(() => {
    setIsSelected(!isSelected);
    if (!isSelected) {
      onSelectSpice();
    } else {
      onUnselectSpice();
    }
  }, [isSelected, onSelectSpice, onUnselectSpice]);

  return (
    <Pressable
      style={[styles.toolItem, isSelected && styles.selected]}
      onPress={handlePressItem}>
      <FastImage source={{uri: spice.img_url}} style={styles.toolImg} />
      <Typo style={isSelected ? styles.selectedName : styles.toolName}>
        {spice[`name_${i18n.language}` as keyof ISpice]}
      </Typo>
    </Pressable>
  );
};

export default memo(ItemSpiceSelect);

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
