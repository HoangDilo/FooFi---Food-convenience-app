import React from 'react';
import {View} from 'react-native';
import {IRecommendPostItem} from '@/types/home.type';
import {ScaledSheet} from 'react-native-size-matters/extend';
import FastImage from 'react-native-fast-image';
import Typo from '../Typo';
import colorsConstant from '@/constants/colors.constant';

interface IRecommendPostItemProps {
  item: IRecommendPostItem;
}

const RecommendPostItem = ({item}: IRecommendPostItemProps) => {
  return (
    <View style={styles.itemContainer}>
      <FastImage
        source={{
          uri: item.dish_info.img_url,
        }}
        style={styles.postImg}
      />
      <View style={styles.postInfo}>
        <View style={styles.topBox}>
          <FastImage
            source={{
              uri: item.user_info.avt_url,
            }}
            style={styles.avtUser}
          />
          <Typo style={styles.userName}>{item.user_info.name}</Typo>
        </View>
      </View>
    </View>
  );
};

export default RecommendPostItem;

const styles = ScaledSheet.create({
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: '16@s',
    overflow: 'hidden',
  },
  postImg: {
    height: '200@s',
  },
  postInfo: {
    padding: '12@s',
  },
  avtUser: {
    width: '32@s',
    height: '32@s',
    borderRadius: '24@s',
  },
  topBox: {
    flexDirection: 'row',
  },
  userName: {
    color: colorsConstant.black_1,
  },
});
