import {Pressable, View} from 'react-native';
import React, {memo, useMemo} from 'react';
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
import {IDishesBySession} from '@/types/home.type';

const SESSION_ICONS = {
  morning: Morning,
  noon: Noon,
  afternoon: Afternoon,
  evening: Evening,
  night: Night,
};

interface IDaySessionRecommendProps {
  option?: string;
  onChooseOtherOptions: () => void;
}

const DISHES_BY_SESSION: IDishesBySession[] = [
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

const DaySessionRecommend = ({
  option = undefined,
  onChooseOtherOptions,
}: IDaySessionRecommendProps) => {
  const {t} = useTranslation();
  const currentSession = useMemo(() => getDaySession(), []);
  const sessionLabel = useMemo(() => option || getDaySession(), [option]);

  return (
    <View style={styles.container}>
      <View style={styles.daySessionWrapper}>
        <Typo style={styles.daySessionLabel}>
          {t('home.its_now')}
          <Typo style={styles.daySessionLabel}>
            {' '}
            {t(`daySession.${currentSession}`)}!
          </Typo>
        </Typo>
        <IconXML
          icon={SESSION_ICONS[currentSession as keyof typeof SESSION_ICONS]}
          width={scale(40)}
          height={scale(40)}
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
          {t('home.you_dont_want_session')} {t(`mealBySession.${sessionLabel}`)}
          {'? '}
        </Typo>
        <Pressable onPress={onChooseOtherOptions}>
          <Typo style={styles.otherOptionsLabel}>{t('other_options')}</Typo>
        </Pressable>
      </View>
    </View>
  );
};

export default memo(DaySessionRecommend);

const styles = ScaledSheet.create({
  container: {},
  daySessionLabel: {
    color: colorsConstant.primary,
    fontSize: '26@s',
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
    alignItems: 'center',
    marginTop: '2@s',
  },
  otherOptionText: {
    fontSize: '13@s',
    color: colorsConstant.gray_1,
  },
  otherOptionsLabel: {
    fontSize: '13@s',
    color: colorsConstant.secondary,
    textDecorationLine: 'underline',
    paddingTop: '3@s',
    paddingBottom: '5@s',
  },
});
