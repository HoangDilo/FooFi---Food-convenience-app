import {View} from 'react-native';
import React, {useCallback} from 'react';
import {scale, ScaledSheet} from 'react-native-size-matters/extend';
import IconXML from '../IconXML';
import Typo from '../Typo';
import colorsConstant from '@/constants/colors.constant';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BackBlack from '@/assets/icons/BackBlack';
import {useNavigation} from '@react-navigation/native';

interface IHeaderStackProps {
  title: string;
}

const HeaderStack = ({title}: IHeaderStackProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={[styles.container, {marginTop: insets.top}]}>
      <IconXML
        icon={BackBlack}
        width={scale(48)}
        height={scale(48)}
        onPress={handleGoBack}
      />
      <Typo style={styles.title}>{title}</Typo>
      <View style={styles.invisible}></View>
    </View>
  );
};

export default HeaderStack;

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '16@s',
    flexDirection: 'row',
    paddingVertical: '4@s',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '4@s',
  },
  title: {
    fontSize: '24@s',
    fontWeight: '700',
    color: colorsConstant.black_1,
  },
  invisible: {
    width: '48@s',
    height: '48@s',
  },
});
