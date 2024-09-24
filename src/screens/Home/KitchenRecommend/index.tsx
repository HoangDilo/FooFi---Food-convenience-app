import {StyleSheet, View} from 'react-native';
import React, { memo } from 'react';
import ListDishRecommendBy from '@/components/ListDishRecommendBy';
import {IItemDish} from '@/types/dish.type';
import {useTranslation} from 'react-i18next';

const DISHES_BY_KITCHEN: IItemDish[] = [
  {
    id: 1,
    img_url:
      'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg',
    name: 'Spaghetti Carbonara',
  },
  {
    id: 2,
    img_url:
      'https://media.istockphoto.com/id/2154236681/photo/pan-fried-asparagus-with-fried-egg-and-panko-gremolata.jpg?b=1&s=612x612&w=0&k=20&c=W1accBphnuGs5i5YrvsjMtsl386neidrk7y_EAodaxQ=',
    name: 'Grilled Salmon',
  },
  {
    id: 3,
    img_url:
      'https://www.foodiesfeed.com/wp-content/uploads/2023/08/crispy-spicy-chicken-wings.jpg',
    name: 'Chicken Caesar Salad',
  },
  {
    id: 4,
    img_url:
      'https://www.foodiesfeed.com/wp-content/uploads/2023/06/pouring-honey-on-pancakes.jpg',
    name: 'Margherita Pizza',
  },
  {
    id: 5,
    img_url:
      'https://www.foodiesfeed.com/wp-content/uploads/2023/05/freshly-prepared-beef-steak-with-vegetables.jpg',
    name: 'Beef Stroganoff',
  },
  {
    id: 6,
    img_url:
      'https://www.foodiesfeed.com/wp-content/uploads/2023/08/grilled-crispy-pork-with-rice.jpg',
    name: 'Tuna Poke Bowl',
  },
  {
    id: 7,
    img_url:
      'https://www.foodiesfeed.com/wp-content/uploads/2023/10/mediterranean-chickpea-salad.jpg',
    name: 'Lamb Shawarma',
  },
  {
    id: 8,
    img_url:
      'https://www.foodiesfeed.com/wp-content/uploads/2023/05/pizza-cinematic.jpg',
    name: 'Vegan Buddha Bowl',
  },
  {
    id: 9,
    img_url:
      'https://www.foodiesfeed.com/wp-content/uploads/2023/12/seafood-soup.jpg',
    name: 'Eggplant Parmesan',
  },
  {
    id: 10,
    img_url:
      'https://www.foodiesfeed.com/wp-content/uploads/2023/04/fresh-fruit-salad-with-mint.jpg',
    name: 'Sushi Platter',
  },
];

const KitchenRecommend = memo(() => {
  const {t} = useTranslation();
  return (
    <View>
      <ListDishRecommendBy
        renderData={DISHES_BY_KITCHEN}
        label={t('home.cooking_with_your_ingredients') + ':'}
      />
    </View>
  );
});

export default KitchenRecommend;

const styles = StyleSheet.create({});
