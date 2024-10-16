import {Keyboard, TextInput, TouchableHighlight, View} from 'react-native';
import React from 'react';
import {scale, ScaledSheet} from 'react-native-size-matters/extend';
import Typo from '../Typo';
import {useTranslation} from 'react-i18next';
import colorsConstant from '@/constants/colors.constant';
import IconXML from '../IconXML';
import XBlack from '@/assets/icons/XBlack';

interface ISearchKitchenProps {
  value: string;
  onChange: (value: string) => void;
  placeholderName: string;
}

const SearchKitchen = ({
  value,
  onChange,
  placeholderName = '',
}: ISearchKitchenProps) => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          value={value}
          style={[
            styles.input,
            {
              paddingRight: scale(value ? 36 : 12),
            },
          ]}
          cursorColor={colorsConstant.primary}
          placeholderTextColor={colorsConstant.gray_2}
          placeholder={t('kitchen.placeholder_search', {
            value: placeholderName.toLowerCase(),
          })}
          onChangeText={onChange}
        />
        {value && (
          <IconXML
            icon={XBlack}
            width={scale(20)}
            height={scale(20)}
            style={styles.iconX}
            onPress={() => onChange('')}
          />
        )}
      </View>
      <TouchableHighlight
        style={styles.searchButton}
        underlayColor={colorsConstant.primary_press}
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <Typo style={styles.searchLabel}>{t('kitchen.ok')}</Typo>
      </TouchableHighlight>
    </View>
  );
};

export default SearchKitchen;

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '8@s',
  },
  inputWrapper: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
  },
  iconX: {
    position: 'absolute',
    right: '12@s',
  },
  input: {
    shadowColor: colorsConstant.shadow,
    elevation: 4,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    borderRadius: 999,
    backgroundColor: '#FFF',
    paddingLeft: '12@s',
    paddingVertical: '8@s',
    color: colorsConstant.black_1,
  },
  searchButton: {
    borderRadius: 500,
    backgroundColor: colorsConstant.primary,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colorsConstant.shadow,
    elevation: 4,
    paddingHorizontal: '12@s',
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
  searchLabel: {
    color: '#FFF',
    fontWeight: '600',
    textAlign: 'center',
  },
});
