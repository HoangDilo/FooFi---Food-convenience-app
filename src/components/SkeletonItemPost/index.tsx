import {View} from 'react-native';
import React from 'react';
import SkeletonLoading from '../SkeletonLoading';
import {ScaledSheet} from 'react-native-size-matters/extend';
import {deviceWidth} from '@/constants/device.constant';

interface ISkeletonItemPost {
  numberItems?: number;
}

const SkeletonItemPost = ({numberItems = 1}: ISkeletonItemPost) => {
  return (
    <View style={styles.skeletonContainer}>
      {Array.from({length: numberItems}, (_, index) => index + 1).map(
        (item, index) => (
          <View key={index}>
            <View style={styles.skeletonTop}>
              <SkeletonLoading skeletonStyle={styles.skeletonAvatar} />
              <View>
                <SkeletonLoading skeletonStyle={styles.skeletonName} />
                <SkeletonLoading skeletonStyle={styles.skeletonTime} />
              </View>
              <SkeletonLoading skeletonStyle={styles.skeletonLike} />
            </View>
            <SkeletonLoading skeletonStyle={styles.skeletonDescription} />
            <SkeletonLoading skeletonStyle={styles.skeletonImage} />
          </View>
        ),
      )}
    </View>
  );
};

export default SkeletonItemPost;

const styles = ScaledSheet.create({
  skeletonContainer: {
    gap: '36@s',
    paddingVertical: '32@s',
  },
  skeletonImage: {
    width: deviceWidth,
    height: '300@vs',
  },
  skeletonAvatar: {
    width: '40@s',
    height: '40@s',
    borderRadius: 999,
  },
  skeletonTop: {
    flexDirection: 'row',
    paddingHorizontal: '8@s',
    gap: '12@s',
    alignItems: 'center',
  },
  skeletonName: {
    width: '80@s',
    height: '20@s',
    marginBottom: '4@s',
    borderRadius: 999,
  },
  skeletonTime: {
    width: '60@s',
    height: '18@s',
    borderRadius: 999,
  },
  skeletonDescription: {
    width: '200@s',
    height: '20@s',
    marginTop: '12@s',
    marginBottom: '8@s',
    borderRadius: 999,
    marginLeft: '8@s',
  },
  skeletonLike: {
    height: '32@s',
    width: '100@s',
    borderRadius: 999,
    marginLeft: 'auto',
  },
});
