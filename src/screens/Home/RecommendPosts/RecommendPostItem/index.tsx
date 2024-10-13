import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {IRecommendPostItem} from '@/types/home.type';
import {ScaledSheet} from 'react-native-size-matters/extend';
import FastImage from 'react-native-fast-image';
import Typo from '../../../../components/Typo';
import colorsConstant from '@/constants/colors.constant';
import IconXML from '../../../../components/IconXML';
import HeartWhite from '@/assets/icons/HeartWhite';
import HeartRed from '@/assets/icons/HeartRed';
import More from '@/assets/icons/More';
import BlackGradientWrapper from '../../../../components/BlackGradientWrapper';

interface IRecommendPostItemProps {
  item: IRecommendPostItem;
}

const RecommendPostItem = ({item}: IRecommendPostItemProps) => {
  const [isLiked, setIsLiked] = useState(item.is_liked);

  const handleLikePost = useCallback(() => {
    setIsLiked(!isLiked);
  }, [isLiked]);

  const handlePressMore = useCallback(() => {}, []);

  return (
    <View style={styles.itemContainer}>
      <BlackGradientWrapper height={80}>
        <FastImage
          source={{
            uri: item.dish_info.img_url,
          }}
          style={styles.postImg}
        />
      </BlackGradientWrapper>
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
            <Typo style={styles.publishTime}>{' • '}</Typo>
            <Typo style={styles.publishTime}>{item.published_time}</Typo>
          </View>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <IconXML
          icon={isLiked ? HeartWhite : HeartRed}
          width={24}
          height={24}
          onPress={handleLikePost}
        />
        <IconXML icon={More} width={22} height={22} onPress={handlePressMore} />
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
    elevation: 4,
    shadowColor: colorsConstant.shadow_2,
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
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '8@s',
  },
  actionButtons: {
    position: 'absolute',
    top: '12@s',
    right: '12@s',
    flexDirection: 'row',
    gap: '8@s',
    alignItems: 'center',
  },
});
