import {GestureResponderEvent, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';

interface IIconXMLProps {
  icon: string;
  width?: string | number;
  height?: string | number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
}

const IconXML = ({
  icon,
  width,
  height,
  color,
  style,
  onPress,
}: IIconXMLProps) => {
  return (
    <SvgXml
      xml={icon}
      width={width}
      height={height}
      color={color}
      style={style}
      onPress={onPress}
    />
  );
};

export default IconXML;

const styles = StyleSheet.create({});
