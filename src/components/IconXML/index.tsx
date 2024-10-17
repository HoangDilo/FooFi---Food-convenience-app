import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';

interface IIconXMLProps {
  icon: string;
  width?: string | number;
  height?: string | number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const IconXML = ({icon, width, height, color, style}: IIconXMLProps) => {
  return (
    <SvgXml
      xml={icon}
      width={width}
      height={height}
      color={color}
      style={style}
    />
  );
};

export default IconXML;

const styles = StyleSheet.create({});
