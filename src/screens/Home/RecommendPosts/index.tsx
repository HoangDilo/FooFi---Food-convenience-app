import {View} from 'react-native';
import React from 'react';
import {ScaledSheet} from 'react-native-size-matters/extend';
import Typo from '@/components/Typo';
import {useTranslation} from 'react-i18next';
import colorsConstant from '@/constants/colors.constant';
import RecommendPostItem from '@/screens/Home/RecommendPosts/RecommendPostItem';
import {IRecommendPostItem} from '@/types/home.type';
import {useNavigation} from '@react-navigation/native';

const listRecommendPosts: IRecommendPostItem[] = [
  {
    id: 1,
    is_standard: false,
    description: 'This dish is so good',
    published_time: '26-04',
    likes: 40,
    language: 'vi',
    is_liked: false,
    user_info: {
      id: 1,
      name: 'HoangDilo',
      avt_url:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH3MW7eGaYWiRrk3AajqEiCFQBJwgSTULhyw&s',
    },
    dish_info: {
      id: 1,
      name: 'Bun dau mam tom',
      img_url:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRW8vMm92qXg5kbtBrXCfgttXlBZvMT7rCVQ&s',
      duration: 30,
    },
  },
  {
    id: 2,
    is_standard: false,
    description: 'This dish is easy to make',
    published_time: '27-04',
    likes: 40,
    language: 'vi',
    is_liked: true,
    user_info: {
      id: 2,
      name: 'HoangDilo',
      avt_url:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH3MW7eGaYWiRrk3AajqEiCFQBJwgSTULhyw&s',
    },
    dish_info: {
      id: 2,
      name: 'Con chien trung',
      img_url:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY2ELXfcS-QaTgcagOWjUYAIJyIeG_teRWkw&s',
      duration: 20,
    },
  },
];

const RecommendPosts = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Typo style={styles.rcmPostLabel}>
        {t('home.recommend_posts')}
        {':'}
      </Typo>
      {listRecommendPosts.map(item => (
        <RecommendPostItem key={item.id} item={item} />
      ))}
      <Typo
        style={styles.otherPost}
        onPress={() => navigation.navigate('other_chefs')}>
        {t('home.other_post')}
      </Typo>
    </View>
  );
};

export default RecommendPosts;

const styles = ScaledSheet.create({
  container: {
    gap: '12@s',
  },
  rcmPostLabel: {
    fontSize: '18@s',
    fontWeight: 600,
    color: colorsConstant.black_1,
  },
  otherPost: {
    color: colorsConstant.secondary,
    fontWeight: '400',
    alignSelf: 'center',
    fontSize: '14@s',
    textDecorationLine: 'underline',
    marginBottom: '8@s',
  },
});
