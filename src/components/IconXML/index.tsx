import {StyleSheet} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';

interface IIconXMLProps {
  icon: string;
  width?: string | number;
  height?: string | number;
  color?: string;
}

const IconXML = ({icon, width, height, color}: IIconXMLProps) => {
  return <SvgXml xml={icon} width={width} height={height} color={color} />;
};

export default IconXML;

const styles = StyleSheet.create({});
