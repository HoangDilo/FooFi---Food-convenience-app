import {View} from 'react-native';
import React, {useCallback} from 'react';
import {ScaledSheet} from 'react-native-size-matters/extend';
import Typo from '@/components/Typo';
import colorsConstant from '@/constants/colors.constant';
import {useTranslation} from 'react-i18next';
import PlusCircle from '@/assets/icons/PlusCircle';
import IconXML from '@/components/IconXML';

const KitchenSpices = () => {
  const {t} = useTranslation();

  const handleAddTool = useCallback(() => {}, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Typo style={styles.headerLabel}>{t('kitchen.kitchen_spices')}</Typo>
        <IconXML
          icon={PlusCircle}
          width={32}
          height={32}
          onPress={handleAddTool}
        />
      </View>
      {}
    </View>
  );
};

export default KitchenSpices;

const styles = ScaledSheet.create({
  container: {},
  header: {
    backgroundColor: '#FFF',
    borderRadius: '16@s',
    paddingVertical: '12@s',
    paddingHorizontal: '18@s',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: colorsConstant.shadow,
    elevation: 4,
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
  headerLabel: {
    fontSize: '20@s',
    fontWeight: '600',
    color: colorsConstant.black_1,
  },
});
