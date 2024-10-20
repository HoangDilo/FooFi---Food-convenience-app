import React, {ReactElement} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {ScaledSheet} from 'react-native-size-matters/extend';
import Typo from '../Typo';
import colorsConstant from '@/constants/colors.constant';

interface IHeaderTabProps {
  isOrange?: boolean;
  rightIcon?: ReactElement;
  stylesCustom: StyleProp<ViewStyle>;
}

const HeaderTab = ({
  isOrange = true,
  rightIcon,
  stylesCustom,
}: IHeaderTabProps) => {
  const route = useRoute();
  const {t} = useTranslation();

  return (
    <View
      style={[
        styles.headerContainer,
        {
          backgroundColor: isOrange
            ? colorsConstant.primary
            : colorsConstant.background,
        },
        stylesCustom,
      ]}>
      <Typo
        style={[
          styles.headerTitle,
          {
            color: isOrange
              ? colorsConstant.background
              : colorsConstant.black_1,
          },
        ]}>
        {t(`tabs_name.${route.name}`)}
      </Typo>
      {rightIcon}
    </View>
  );
};

export default HeaderTab;

const styles = ScaledSheet.create({
  headerContainer: {
    paddingHorizontal: '20@s',
    paddingVertical: '16@s',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: '28@s',
    fontWeight: '700',
  },
});
