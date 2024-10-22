import {StyleSheet, TextInput, TouchableHighlight, View} from 'react-native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import colorsConstant from '@/constants/colors.constant';
import {useTranslation} from 'react-i18next';
import Typo from '@/components/Typo';
import IconXML from '@/components/IconXML';
import SearchBlack from '@/assets/icons/SearchBlack';
import SearchOrange from '@/assets/icons/SearchOrange';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '@/hooks/redux';
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const HomeSearch = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {isBottomTabHidden} = useAppSelector(state => state.system);

  const [isFocusInput, setIsFocusInput] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    shadowColor: interpolateColor(
      opacity.value,
      [0, 1],
      ['#00000000', colorsConstant.shadow],
    ),
    elevation: interpolate(opacity.value, [0, 1], [0, 4]),
  }));

  const handleFocusInput = useCallback(() => {
    setIsFocusInput(true);
  }, []);

  const handleBlurInput = useCallback(() => {
    setIsFocusInput(false);
  }, []);

  const handleChangeText = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const handlePressSearch = useCallback(() => {
    navigation.navigate('search', {
      query: searchValue,
      listItemsFilter: [],
    });
  }, [navigation, searchValue]);

  useEffect(() => {
    if (isBottomTabHidden) {
      opacity.value = withTiming(0, {
        duration: 1000,
        easing: Easing.inOut(Easing.quad),
      });
    } else {
      opacity.value = 1;
    }
  }, [isBottomTabHidden, opacity]);

  return (
    <View>
      <Typo style={styles.inputLabel}>{t('home.you_want_other')}</Typo>
      <View style={styles.inputWrapper}>
        <IconXML
          icon={isFocusInput ? SearchOrange : SearchBlack}
          width={20}
          height={20}
          style={styles.iconInput}
        />
        <Animated.View style={[animatedStyle, styles.inputWrapperAnimated]}>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: isFocusInput
                  ? colorsConstant.primary
                  : colorsConstant.black_1,
              },
            ]}
            value={searchValue}
            placeholder={isFocusInput ? '' : t('home.find_your_dish')}
            placeholderTextColor={colorsConstant.gray_1}
            cursorColor={colorsConstant.primary}
            returnKeyType="search"
            underlineColorAndroid={colorsConstant.transparent}
            onChangeText={handleChangeText}
            onFocus={handleFocusInput}
            onBlur={handleBlurInput}
            onSubmitEditing={handlePressSearch}
          />
        </Animated.View>
        <Animated.View
          style={[animatedStyle, {borderRadius: 999, maxHeight: '100%'}]}>
          <TouchableHighlight
            style={styles.searchButton}
            underlayColor={colorsConstant.primary_press}
            onPress={handlePressSearch}>
            <Typo style={styles.searchLabel}>{t('home.search')}</Typo>
          </TouchableHighlight>
        </Animated.View>
      </View>
    </View>
  );
};

export default memo(HomeSearch);

const styles = StyleSheet.create({
  inputLabel: {
    fontWeight: '500',
    fontSize: 16,
    color: colorsConstant.black_1,
    marginBottom: 6,
  },
  inputWrapperAnimated: {
    borderRadius: 999,
    flex: 1,
  },
  input: {
    borderRadius: 500,
    paddingHorizontal: 16,
    paddingLeft: 42,
    paddingVertical: 0,
    height: 40,
    fontSize: 16,
    lineHeight: 24,
    color: colorsConstant.black_1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
  inputWrapper: {
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  iconInput: {
    position: 'absolute',
    left: 12,
    zIndex: 2,
  },
  searchButton: {
    flex: 1,
    height: 'auto',
    borderRadius: 500,
    backgroundColor: colorsConstant.primary,
    flexDirection: 'row',
    paddingHorizontal: 12,
    alignItems: 'center',
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
  searchLabel: {
    color: '#FFF',
    fontWeight: '600',
  },
});
