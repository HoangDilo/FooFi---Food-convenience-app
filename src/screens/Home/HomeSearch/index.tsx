import {StyleSheet, TextInput, TouchableHighlight, View} from 'react-native';
import React, {memo, useCallback, useState} from 'react';
import colorsConstant from '@/constants/colors.constant';
import {useTranslation} from 'react-i18next';
import Typo from '@/components/Typo';
import IconXML from '@/components/IconXML';
import SearchBlack from '@/assets/icons/SearchBlack';
import SearchOrange from '@/assets/icons/SearchOrange';
import {useNavigation} from '@react-navigation/native';

const HomeSearch = memo(() => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [isFocusInput, setIsFocusInput] = useState(false);
  const [searchValue, setSearchValue] = useState('');

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
  }, []);

  return (
    <View>
      <Typo style={styles.inputLabel}>{t('home.you_want_other')}</Typo>
      <View style={styles.inputWrapper}>
        <IconXML
          icon={isFocusInput ? SearchOrange : SearchBlack}
          width={24}
          height={24}
          style={styles.iconInput}
        />
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
          returnKeyType='search'
          underlineColorAndroid={colorsConstant.transparent}
          onChangeText={handleChangeText}
          onFocus={handleFocusInput}
          onBlur={handleBlurInput}
          onSubmitEditing={handlePressSearch}
        />
        <TouchableHighlight
          style={styles.searchButton}
          underlayColor={colorsConstant.primary_press}
          onPress={handlePressSearch}>
          <Typo style={styles.searchLabel}>{t('home.search')}</Typo>
        </TouchableHighlight>
      </View>
    </View>
  );
});

export default HomeSearch;

const styles = StyleSheet.create({
  inputLabel: {
    fontWeight: '500',
    fontSize: 16,
    color: colorsConstant.black_1,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1.2,
    borderColor: colorsConstant.black_1,
    borderRadius: 500,
    paddingHorizontal: 16,
    paddingLeft: 42,
    paddingVertical: 0,
    height: 40,
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: colorsConstant.black_1,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  searchButton: {
    borderRadius: 500,
    backgroundColor: colorsConstant.primary,
    height: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  searchLabel: {
    color: '#FFF',
    fontWeight: '600',
  },
});
