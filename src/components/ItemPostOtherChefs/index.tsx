import {Pressable, View} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {IPost} from '@/types/otherchefs.type';
import {scale, ScaledSheet} from 'react-native-size-matters/extend';
import FastImage from 'react-native-fast-image';
import Typo from '../Typo';
import colorsConstant from '@/constants/colors.constant';
import {deviceWidth} from '@/constants/device.constant';
import SkeletonLoadingWrapper from '../SkeletonLoadingWrapper';
import {formatPostTime, getPostMinDiff} from '@/utils/time';
import {useTranslation} from 'react-i18next';
import IconXML from '../IconXML';
import HeartRed from '@/assets/icons/HeartRed';
import HeartBlack2 from '@/assets/icons/HeartBlack2';
import BlackGradientWrapper from '../BlackGradientWrapper';
import DotWhite from '@/assets/icons/DotWhite';
import {useNavigation} from '@react-navigation/native';
import TrashCanRed from '@/assets/icons/TrashCanRed';

interface IItemPostOThersChef {
  post: IPost;
  isShowLike?: boolean;
  onPressDelete?: () => void;
}

const ItemPostOtherChefs = ({
  post,
  isShowLike = true,
  onPressDelete,
}: IItemPostOThersChef) => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const [isLoadingDishImg, setIsLoadingDisImg] = useState(true);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(true);
  const [isLiked, setIsLiked] = useState(post.is_liked);

  const timeFormatted = useMemo(() => {
    const minDiff = getPostMinDiff(post.published_time);
    if (minDiff < 1) {
      return t('time.just_now');
    } else if (minDiff < 60) {
      return `${minDiff} ${(t('time.minute'), {s: 's'})} ${t('time.ago')}`;
    } else if (minDiff < 60 * 24) {
      return `${Math.round(minDiff / 60)} ${t('time.hour', {s: 's'})} ${t(
        'time.ago',
      )}`;
    } else {
      return formatPostTime(post.published_time);
    }
  }, [post.published_time, t]);

  const handleLike = useCallback(() => {
    setIsLiked(!isLiked);
  }, [isLiked]);

  const handlePressDish = useCallback(() => {
    navigation.navigate('dish_details', {
      post_id: post.id,
      is_standard: post.is_standard,
      description: post.description,
      published_time: post.published_time,
      dish_info: {
        name: post.dish_info.name,
        img_url: post.dish_info.img_url,
        duration: post.dish_info.duration,
      },
      user_info: {
        name: post.user_info.name,
        avt_url: post.user_info.avt_url,
      },
    });
  }, [navigation, post]);

  return (
    <View style={styles.post}>
      <View style={styles.userInfo}>
        <SkeletonLoadingWrapper
          isLoading={isLoadingAvatar}
          skeletonStyle={styles.skeletonAvatar}>
          <FastImage
            source={{uri: post.user_info.avt_url}}
            style={styles.avatar}
            onLoad={() => setIsLoadingAvatar(false)}
          />
        </SkeletonLoadingWrapper>
        <View style={styles.texts}>
          <Typo style={styles.userName}>{post.user_info.name}</Typo>
          <Typo style={styles.time}>{timeFormatted}</Typo>
        </View>
        <View style={styles.like}>
          <Typo style={styles.likeLabel}>
            {post.likes} {t('other_chefs.likes')}
          </Typo>
          {isShowLike ? (
            <IconXML
              icon={isLiked ? HeartRed : HeartBlack2}
              width={scale(32)}
              height={scale(32)}
              onPress={handleLike}
            />
          ) : (
            <IconXML
              style={{marginLeft: scale(8)}}
              icon={TrashCanRed}
              width={scale(32)}
              height={scale(32)}
              onPress={onPressDelete}
            />
          )}
        </View>
      </View>
      <Typo style={styles.description}>{post.description}</Typo>
      <Pressable style={styles.dishInfo} onPress={handlePressDish}>
        <SkeletonLoadingWrapper isLoading={isLoadingDishImg}>
          <BlackGradientWrapper width={deviceWidth} height={scale(120)}>
            <FastImage
              source={{uri: post.dish_info.img_url}}
              style={styles.dishImg}
              onLoad={() => setIsLoadingDisImg(false)}
            />
          </BlackGradientWrapper>
          <View style={styles.dishContainer}>
            <View style={styles.textDish}>
              <View style={styles.durationWrapper}>
                <IconXML icon={DotWhite} width={scale(6)} height={scale(6)} />
                <Typo style={styles.duration}>
                  {post.dish_info.duration}{' '}
                  {t('time.minute', {
                    s: post.dish_info.duration > 1 ? 's' : '',
                  })}
                </Typo>
              </View>
              <Typo style={styles.dishName}>{post.dish_info.name}</Typo>
            </View>
            <View style={styles.whiteLine} />
          </View>
        </SkeletonLoadingWrapper>
      </Pressable>
    </View>
  );
};

export default ItemPostOtherChefs;

const styles = ScaledSheet.create({
  post: {
    gap: '8@s',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '12@s',
    paddingHorizontal: '8@s',
  },
  avatar: {
    width: '40@s',
    height: '40@s',
    borderRadius: 999,
  },
  texts: {},
  userName: {
    color: colorsConstant.black_1,
    fontWeight: '600',
    fontSize: '16@s',
  },
  time: {
    color: colorsConstant.gray_1,
    fontSize: '14@s',
  },
  description: {
    color: colorsConstant.black_2,
    fontSize: '14@s',
    paddingHorizontal: '8@s',
  },
  like: {
    flexDirection: 'row',
    gap: '8@s',
    marginLeft: 'auto',
    alignItems: 'center',
    marginRight: '8@s',
  },
  likeLabel: {
    fontWeight: '500',
    fontSize: '16@s',
    color: colorsConstant.black_2,
  },
  dishInfo: {
    position: 'relative',
  },
  dishImg: {
    width: deviceWidth,
    height: '300@vs',
  },
  skeletonAvatar: {
    borderRadius: 999,
    width: '40@s',
    height: '40@s',
  },
  dishContainer: {
    position: 'absolute',
    bottom: '20@s',
    zIndex: 2,
  },
  dishName: {
    fontSize: '24@s',
    fontWeight: '600',
    color: '#FFF',
  },
  whiteLine: {
    height: '2@s',
    backgroundColor: '#FFF',
    flex: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  textDish: {
    alignItems: 'flex-start',
    marginLeft: '16@s',
    marginRight: '8@s',
    marginBottom: '4@s',
  },
  duration: {
    color: '#FFF',
    fontWeight: '500',
    fontSize: '18@s',
  },
  durationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '12@s',
  },
});
