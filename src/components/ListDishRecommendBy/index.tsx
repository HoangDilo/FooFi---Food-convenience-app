import React from 'react';
import {FlatList, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters/extend';

import colorsConstant from '@/constants/colors.constant';

import Typo from '@/components/Typo';
import ItemDish from '../../screens/Home/ItemDish';
import SeeAll from '@/components/SeeAll';
import {IItemDish} from '@/types/dish.type';

interface IListDishRecommendByProps {
  renderData: IItemDish[];
  label: string;
}

const ListDishRecommendBy = ({
  renderData,
  label,
}: IListDishRecommendByProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Typo style={styles.labelDishesList}>{label}</Typo>
        <SeeAll />
      </View>
      <FlatList
        data={renderData}
        keyExtractor={item => `${item.id}`}
        renderItem={({item}) => <ItemDish item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        overScrollMode="never"
        contentContainerStyle={styles.listFoodContainer}
      />
    </View>
  );
};

export default ListDishRecommendBy;

const styles = ScaledSheet.create({
  container: {
    marginBottom: 8,
  },
  labelDishesList: {
    fontSize: '18@s',
    color: colorsConstant.black_1,
    fontWeight: '600',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  listFoodContainer: {
    gap: '14@s',
  },
});
