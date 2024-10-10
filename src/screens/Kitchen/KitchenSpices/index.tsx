import {View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {ScaledSheet} from 'react-native-size-matters/extend';
import Typo from '@/components/Typo';
import colorsConstant from '@/constants/colors.constant';
import {useTranslation} from 'react-i18next';
import PlusCircle from '@/assets/icons/PlusCircle';
import IconXML from '@/components/IconXML';
import {ISpice} from '@/types/kitchen.type';
import ItemSpiceDisplay from './ItemSpiceDisplay';

const listSpicesFake: ISpice[] = [
  {
    id: 1,
    name_en: 'Cinnamon',
    name_vi: 'Quế',
    img_url: 'https://example.com/images/cinnamon.jpg',
  },
  {
    id: 2,
    name_en: 'Pepper',
    name_vi: 'Tiêu',
    img_url: 'https://example.com/images/pepper.jpg',
  },
  {
    id: 3,
    name_en: 'Turmeric',
    name_vi: 'Nghệ',
    img_url: 'https://example.com/images/turmeric.jpg',
  },
  {
    id: 4,
    name_en: 'Star Anise',
    name_vi: 'Hoa hồi',
    img_url: 'https://example.com/images/star_anise.jpg',
  },
  {
    id: 5,
    name_en: 'Ginger',
    name_vi: 'Gừng',
    img_url: 'https://example.com/images/ginger.jpg',
  },
  {
    id: 6,
    name_en: 'Cardamom',
    name_vi: 'Bạch đậu khấu',
    img_url: 'https://example.com/images/cardamom.jpg',
  },
  {
    id: 7,
    name_en: 'Cloves',
    name_vi: 'Đinh hương',
    img_url: 'https://example.com/images/cloves.jpg',
  },
  {
    id: 8,
    name_en: 'Fennel Seeds',
    name_vi: 'Hạt thì là',
    img_url: 'https://example.com/images/fennel_seeds.jpg',
  },
  {
    id: 9,
    name_en: 'Coriander',
    name_vi: 'Ngò',
    img_url: 'https://example.com/images/coriander.jpg',
  },
  {
    id: 10,
    name_en: 'Basil',
    name_vi: 'Húng quế',
    img_url: 'https://example.com/images/basil.jpg',
  },
];
const KitchenSpices = () => {
  const {t} = useTranslation();

  const [listSpices, setListSpices] = useState<ISpice[]>([]);

  const handleAddTool = useCallback(() => {}, []);

  const handleRemoveSpice = useCallback((id: number) => {}, []);

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
      {listSpices.length ? (
        <View>
          {listSpicesFake.map(spice => (
            <ItemSpiceDisplay
              key={spice.id}
              spice={spice}
              onRemoveSpice={() => handleRemoveSpice(spice.id)}
            />
          ))}
        </View>
      ) : (
        <Typo style={styles.emptySpices}>{t('kitchen.empty_spice')}</Typo>
      )}
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
  emptySpices: {
    fontSize: '14@s',
    color: colorsConstant.gray_2,
    marginTop: '8@s',
    textAlign: 'right',
    paddingHorizontal: '8@s',
  },
});
