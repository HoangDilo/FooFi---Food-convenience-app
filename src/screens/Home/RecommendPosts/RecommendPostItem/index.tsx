import React, {useCallback, useState} from 'react';
import {Pressable, View} from 'react-native';
import {IRecommendPostItem} from '@/types/home.type';
import {scale, ScaledSheet} from 'react-native-size-matters/extend';
import FastImage from 'react-native-fast-image';
import Typo from '../../../../components/Typo';
import colorsConstant from '@/constants/colors.constant';
import IconXML from '../../../../components/IconXML';
import HeartWhite from '@/assets/icons/HeartWhite';
import HeartRed from '@/assets/icons/HeartRed';
import BlackGradientWrapper from '../../../../components/BlackGradientWrapper';
import {useNavigation} from '@react-navigation/native';
import DotWhite from '@/assets/icons/DotWhite';
import {useTranslation} from 'react-i18next';

interface IRecommendPostItemProps {
  item: IRecommendPostItem;
}

const RecommendPostItem = ({item}: IRecommendPostItemProps) => {
  const navigation = useNavigation();
  const {t} = useTranslation();

  const [isLiked, setIsLiked] = useState(item.is_liked);

  const handleLikePost = useCallback(() => {
    setIsLiked(!isLiked);
  }, [isLiked]);

  const handlePressItem = useCallback(() => {
    navigation.navigate('dish_details', {
      post_id: item.id,
      is_standard: item.is_standard,
      description: item.description,
      published_time: item.published_time,
      user_info: {
        name: item.user_info.name,
        avt_url: item.user_info.avt_url,
      },
      dish_info: {
        name: item.dish_info.name,
        img_url: item.dish_info.img_url,
        duration: item.dish_info.duration,
      },
    });
  }, [item, navigation]);

  return (
    <View style={styles.itemContainer}>
      <Pressable onPress={handlePressItem} style={styles.imgWrapper}>
        <BlackGradientWrapper height={100}>
          <FastImage
            source={{
              uri: item.dish_info.img_url,
            }}
            style={styles.postImg}
          />
        </BlackGradientWrapper>
        <View style={styles.dishContainer}>
          <View style={styles.textDish}>
            <View style={styles.durationWrapper}>
              <IconXML icon={DotWhite} width={scale(6)} height={scale(6)} />
              <Typo style={styles.duration}>
                {item.dish_info.duration}{' '}
                {t('time.minute', {
                  s: item.dish_info.duration > 1 ? 's' : '',
                })}
              </Typo>
            </View>
            <Typo style={styles.dishName}>{item.dish_info.name}</Typo>
          </View>
          <View style={styles.whiteLine} />
        </View>
      </Pressable>
      <View style={styles.postInfo}>
        <View style={styles.topBox}>
          <FastImage
            source={{
              uri: item.user_info.avt_url,
            }}
            style={styles.avtUser}
          />
          <View>
            <View style={styles.boxRight}>
              <Typo style={styles.userName}>{item.user_info.name}</Typo>
              <Typo style={styles.publishTime}>{' • '}</Typo>
              <Typo style={styles.publishTime}>{item.published_time}</Typo>
            </View>
            <Typo style={styles.description}>{item.description}</Typo>
          </View>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <IconXML
          icon={isLiked ? HeartWhite : HeartRed}
          width={scale(28)}
          height={scale(28)}
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
    marginRight: '12@s',
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
  },
  actionButtons: {
    position: 'absolute',
    top: '16@s',
    right: '16@s',
    flexDirection: 'row',
    gap: '8@s',
    alignItems: 'center',
  },
  imgWrapper: {
    position: 'relative',
  },
  dishContainer: {
    position: 'absolute',
    bottom: '12@s',
    zIndex: 2,
  },
  dishName: {
    fontSize: '20@s',
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
    fontSize: '16@s',
  },
  durationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '12@s',
  },
  description: {
    fontSize: '14@s',
    color: colorsConstant.black_2,
  },
});
