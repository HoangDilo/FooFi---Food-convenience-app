import {View} from 'react-native';
import React from 'react';
import {ScaledSheet} from 'react-native-size-matters/extend';
import FastImage from 'react-native-fast-image';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '@/types/navigation.type';
import {deviceWidth} from '@/constants/device.constant';

const DishDetails = () => {
  const {params} = useRoute<RouteProp<RootStackParamList, 'dish_details'>>();

  return (
    <View style={styles.screen}>
      <FastImage
        source={{uri: params.dish_info.img_url}}
        style={styles.dishImage}
      />
    </View>
  );
};

export default DishDetails;

const styles = ScaledSheet.create({
  screen: {
    flex: 1,
  },
  dishImage: {
    width: deviceWidth,
    height: '400@vs',
  },
});
