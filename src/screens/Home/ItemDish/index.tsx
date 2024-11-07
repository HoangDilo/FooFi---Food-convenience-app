import {Pressable, View} from 'react-native';
import React, {useCallback} from 'react';
import {IDishesBySession} from '@/types/home.type';
import FastImage from 'react-native-fast-image';
import Typo from '@/components/Typo';
import {ScaledSheet} from 'react-native-size-matters/extend';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';

interface IItemDishProps {
  item: IDishesBySession;
}

const ItemDish = ({item}: IItemDishProps) => {
  const navigation = useNavigation();

  const handlePressItem = useCallback(() => {
    navigation.navigate('dish_details', {
      post_id: item.id,
      is_standard: true,
      dish_info: {
        name: item.dish_info.name,
        duration: item.dish_info.duration,
        img_url: item.dish_info.img_url,
      },
    });
  }, [navigation, item]);

  return (
    <Pressable style={styles.itemWrapper} onPress={handlePressItem}>
      <FastImage source={{uri: item.dish_info.img_url}} style={styles.img} />
      <View style={styles.itemContents}>
        <Typo
          style={styles.itemName}
          numberOfLines={1}
          textBreakStrategy="highQuality">
          {item.dish_info.name}
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
    </Pressable>
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
