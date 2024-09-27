import React, { useCallback } from 'react';
import {View} from 'react-native';
import {IRecommendPostItem} from '@/types/home.type';
import {ScaledSheet} from 'react-native-size-matters/extend';
import FastImage from 'react-native-fast-image';
import Typo from '../Typo';
import colorsConstant from '@/constants/colors.constant';
import IconXML from '../IconXML';
import HeartWhite from '@/assets/icons/HeartWhite';
import HeartRed from '@/assets/icons/HeartRed';

interface IRecommendPostItemProps {
  item: IRecommendPostItem;
}

const RecommendPostItem = ({item}: IRecommendPostItemProps) => {
  const handleLikePost = useCallback(() => {

  }, [])

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
          <View style={styles.boxRight}>
            <Typo style={styles.userName}>{item.user_info.name}</Typo>
            <Typo style={styles.publishTime}>{item.published_time}</Typo>
          </View>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <IconXML
          icon={item.is_liked ? HeartWhite : HeartRed}
          width={24}
          height={24}
          onPress={handleLikePost}
        />
      </View>
    </View>
  );
};

export default RecommendPostItem;

const styles = ScaledSheet.create({
  itemContainer: {
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: '16@s',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#00000030',
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
  postImg: {
    height: '200@s',
  },
  postInfo: {
    padding: '12@s',
  },
  avtUser: {
    width: '40@s',
    height: '40@s',
    borderRadius: '24@s',
  },
  topBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    color: colorsConstant.black_1,
    fontWeight: '500',
  },
  publishTime: {
    color: colorsConstant.gray_1,
    fontSize: 12,
  },
  boxRight: {
    marginLeft: '8@s',
  },
  actionButtons: {
    position: 'absolute',
    top: '12@s',
    right: '12@s',
  },
});
