import {StyleSheet, Text, TextProps} from 'react-native';
import React, {useMemo} from 'react';

const InterFont = {
  normal: 'Regular',
  bold: 'Bold',
  '100': 'Light',
  '200': 'Light',
  '300': 'Light',
  '400': 'Regular',
  '500': 'Medium',
  '600': 'SemiBold',
  '700': 'Bold',
  '800': 'ExtraBold',
  '900': 'ExtraBold',
};

interface ITypoProps extends TextProps {}

const Typo = (props: ITypoProps) => {
  const {fontWeight = '400', fontStyle} = StyleSheet.flatten(props.style || {});
  const fontFamily = useMemo(() => {
    if (fontWeight.toString() === '400') {
      return `Inter-${fontStyle === 'italic' ? 'Italic' : 'Regular'}`;
    }
    return `Inter-${
      InterFont[fontWeight.toString() as keyof typeof InterFont]
    }${fontStyle === 'italic' ? 'Italic' : ''}`;
  }, []);

  return (
    <Text {...props} style={[props.style, {fontFamily}, styles.disableStyle]} />
  );
};

export default Typo;

const styles = StyleSheet.create({
  disableStyle: {
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
});
