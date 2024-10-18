import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Typo from '../Typo';
import {useTranslation} from 'react-i18next';

interface IPaginationProps {
  start: number;
  end: number;
  totalCount: number;
  nameItem: string;
}

const Pagination = ({start, end, totalCount, nameItem}: IPaginationProps) => {
  const {t} = useTranslation();

  return (
    <View>
      <Typo>{}</Typo>
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({});
