import {View} from 'react-native';
import React from 'react';
import {scale, ScaledSheet} from 'react-native-size-matters/extend';
import Typo from '@/components/Typo';
import {useTranslation} from 'react-i18next';
import colorsConstant from '@/constants/colors.constant';
import {IKitchenToolsAvailable, ISpice} from '@/types/kitchen.type';
import IconXML from '@/components/IconXML';
import CheckCircleGreen from '@/assets/icons/CheckCircleGreen';
import XCircleRed from '@/assets/icons/XCircleRed';

interface IKitchenToolsAvailableCheck extends IKitchenToolsAvailable {
  is_available: boolean;
}

interface IToolsRequired {
  listTools: IKitchenToolsAvailableCheck[];
}

const ToolsRequired = ({listTools}: IToolsRequired) => {
  const {t, i18n} = useTranslation();

  return (
    <View style={styles.container}>
      <Typo style={styles.title}>
        {t('kitchen.kitchen_tools')} {t('required')}
      </Typo>
      <View style={styles.listTools}>
        {listTools.map(tool => (
          <View style={styles.item} key={tool.id}>
            <IconXML
              icon={tool.is_available ? CheckCircleGreen : XCircleRed}
              width={scale(20)}
              height={scale(20)}
            />
            <View style={styles.info}>
              <Typo style={styles.name}>
                {tool[`name_${i18n.language}` as keyof ISpice]}
              </Typo>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ToolsRequired;

const styles = ScaledSheet.create({
  container: {},
  title: {
    color: colorsConstant.black_1,
    fontWeight: '700',
    fontSize: '24@s',
    marginBottom: '8@s',
  },
  listTools: {},
  item: {
    flexDirection: 'row',
    gap: '8@s',
    alignItems: 'center',
    shadowColor: colorsConstant.shadow_2,
    borderRadius: 999,
    paddingHorizontal: '12@s',
    paddingVertical: '6@s',
  },
  info: {
    flexDirection: 'row',
    gap: '8@s',
    alignItems: 'center',
  },
  name: {
    fontSize: '16@s',
    color: colorsConstant.black_1,
    fontWeight: '500',
  },
});
