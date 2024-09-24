import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IDishesBySession} from '@/types/home.type';
import FastImage from 'react-native-fast-image';
import Typo from '@/components/Typo';
import {ScaledSheet} from 'react-native-size-matters/extend';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';

interface IItemDishProps {
  item: IDishesBySession;
}

const ItemDish = ({item}: IItemDishProps) => {
  return (
    <View style={styles.itemWrapper}>
      <FastImage source={{uri: item.img_url}} style={styles.img} />
      <View style={styles.itemContents}>
        <Typo
          style={styles.itemName}
          numberOfLines={1}
          textBreakStrategy="highQuality">
          {item.name}
        </Typo>
      </View>
      <Svg height="40" width="100%" style={styles.blackOverlay}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#000" stopOpacity="0" />
            <Stop offset="100%" stopColor="#000" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
      </Svg>
    </View>
  );
};

export default ItemDish;

const styles = ScaledSheet.create({
  itemWrapper: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '16@s',
  },
  img: {
    width: '120@s',
    height: '120@s',
  },
  itemContents: {
    position: 'absolute',
    bottom: '6@s',
    paddingHorizontal: '8@s',
    width: '100%',
    zIndex: 1,
  },
  itemName: {
    color: '#FFF',
    fontWeight: 500,
  },
  blackOverlay: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    zIndex: 0,
  },
});
