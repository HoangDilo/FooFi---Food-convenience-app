import {Pressable, View} from 'react-native';
import React, {memo, useCallback, useMemo} from 'react';
import Typo from '@/components/Typo';
import IconXML from '@/components/IconXML';
import colorsConstant from '@/constants/colors.constant';
import {scale, ScaledSheet} from 'react-native-size-matters/extend';
import Morning from '@/assets/icons/Morning';
import Noon from '@/assets/icons/Noon';
import Afternoon from '@/assets/icons/Afternoon';
import Evening from '@/assets/icons/Evening';
import Night from '@/assets/icons/Night';
import {useTranslation} from 'react-i18next';
import {getDaySession} from '@/utils/time';
import ListDishRecommendBy from '@/components/ListDishRecommendBy';
import {IItemDish} from '@/types/dish.type';

const SESSION_ICONS = {
  morning: Morning,
  noon: Noon,
  afternoon: Afternoon,
  evening: Evening,
  night: Night,
};

interface IDaySessionRecommendProps {
  onChooseOtherOptions: () => void;
}

const DISHES_BY_SESSION: IItemDish[] = [
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

const DaySessionRecommend = memo(
  ({onChooseOtherOptions}: IDaySessionRecommendProps) => {
    const {t} = useTranslation();
    const sessionLabel = useMemo(() => getDaySession(), []);

    return (
      <View style={styles.container}>
        <View style={styles.daySessionWrapper}>
          <Typo style={styles.daySessionLabel}>
            {t('home.its_now')}
            <Typo style={styles.daySessionLabel}>
              {' '}
              {t(`daySession.${sessionLabel}`)}!
            </Typo>
          </Typo>
          <IconXML
            icon={SESSION_ICONS[sessionLabel as keyof typeof SESSION_ICONS]}
            width={scale(48)}
            height={scale(48)}
          />
        </View>
        <ListDishRecommendBy
          renderData={DISHES_BY_SESSION}
          label={`${t('home.cooking_for')} ${t(
            `mealBySession.${sessionLabel}`,
          )}:`}
        />
        <View style={styles.otherOptions}>
          <Typo style={styles.otherOptionText}>
            {t('home.you_dont_want_session')}{' '}
            {t(`mealBySession.${sessionLabel}`)}
            {'? '}
          </Typo>
          <Pressable onPress={onChooseOtherOptions}>
            <Typo style={styles.otherOptionsLabel}>{t('other_options')}</Typo>
          </Pressable>
        </View>
      </View>
    );
  },
);

export default DaySessionRecommend;

const styles = ScaledSheet.create({
  container: {},
  daySessionLabel: {
    color: colorsConstant.primary,
    fontSize: '28@s',
    lineHeight: '32@s',
    fontWeight: '600',
  },
  daySessionWrapper: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    gap: '8@s',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '6@s',
  },
  otherOptions: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  otherOptionText: {
    fontSize: '13@s',
    color: colorsConstant.gray_1,
  },
  otherOptionsLabel: {
    fontSize: '13@s',
    color: colorsConstant.secondary,
    textDecorationLine: 'underline',
  },
});
