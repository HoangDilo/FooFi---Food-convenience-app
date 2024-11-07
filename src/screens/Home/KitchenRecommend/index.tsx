import {View} from 'react-native';
import React, {memo} from 'react';
import ListDishRecommendBy from '@/components/ListDishRecommendBy';
import {useTranslation} from 'react-i18next';
import {IDishesBySession} from '@/types/home.type';

const DISHES_BY_KITCHEN: IDishesBySession[] = [
  {
    id: 1,
    is_standard: true,
    language: 'English',
    dish_info: {
      id: 201,
      name: 'Creamy Garlic Pasta',
      img_url:
        'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg',
      duration: 30,
    },
  },
  {
    id: 2,
    is_standard: true,
    language: 'Spanish',
    dish_info: {
      id: 202,
      name: 'Paella Valenciana',
      img_url:
        'https://www.foodiesfeed.com/wp-content/uploads/2023/06/pouring-honey-on-pancakes.jpg',
      duration: 50,
    },
  },
  {
    id: 3,
    is_standard: true,
    language: 'Japanese',
    dish_info: {
      id: 203,
      name: 'Sushi Platter',
      img_url:
        'https://www.foodiesfeed.com/wp-content/uploads/2023/10/bowl-of-ice-cream-with-chocolate.jpg',
      duration: 90,
    },
  },
  {
    id: 4,
    is_standard: true,
    language: 'French',
    dish_info: {
      id: 204,
      name: 'Coq au Vin',
      img_url:
        'https://www.foodiesfeed.com/wp-content/uploads/2023/06/coffee-crema.jpg',
      duration: 120,
    },
  },
  {
    id: 5,
    is_standard: true,
    language: 'Italian',
    dish_info: {
      id: 205,
      name: 'Margherita Pizza',
      img_url:
        'https://www.foodiesfeed.com/wp-content/uploads/2023/06/plate-of-noodles-with-shrimps.jpg',
      duration: 40,
    },
  },
  {
    id: 6,
    is_standard: true,
    language: 'Korean',
    dish_info: {
      id: 206,
      name: 'Bibimbap',
      img_url:
        'https://www.foodiesfeed.com/wp-content/uploads/2023/08/grilled-crispy-pork-with-rice.jpg',
      duration: 35,
    },
  },
  {
    id: 7,
    is_standard: true,
    language: 'Chinese',
    dish_info: {
      id: 207,
      name: 'Kung Pao Chicken',
      img_url:
        'https://www.foodiesfeed.com/wp-content/uploads/2023/05/pizza-salami.jpg',
      duration: 25,
    },
  },
  {
    id: 8,
    is_standard: true,
    language: 'Indian',
    dish_info: {
      id: 208,
      name: 'Butter Chicken',
      img_url:
        'https://www.foodiesfeed.com/wp-content/uploads/2023/05/freshly-prepared-beef-steak-with-vegetables.jpg',
      duration: 45,
    },
  },
  {
    id: 9,
    is_standard: true,
    language: 'German',
    dish_info: {
      id: 209,
      name: 'Schnitzel',
      img_url:
        'https://www.foodiesfeed.com/wp-content/uploads/2023/10/mediterranean-chickpea-salad.jpg',
      duration: 30,
    },
  },
  {
    id: 10,
    is_standard: true,
    language: 'Greek',
    dish_info: {
      id: 210,
      name: 'Moussaka',
      img_url:
        'https://www.foodiesfeed.com/wp-content/uploads/2023/10/mediterranean-chickpea-salad.jpg',
      duration: 70,
    },
  },
];

const KitchenRecommend = () => {
  const {t} = useTranslation();
  return (
    <View>
      <ListDishRecommendBy
        renderData={DISHES_BY_KITCHEN}
        label={t('home.cooking_with_your_ingredients') + ':'}
      />
    </View>
  );
};

export default memo(KitchenRecommend);
