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
import ModalAddKitchenSpices from '@/components/ModalAddKitchenSpices';

const listSpicesFake: ISpice[] = [
  {
    id: 1,
    name_en: 'Cinnamon',
    name_vi: 'Quế',
    img_url:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Cinnamomum_verum_spices.jpg/1200px-Cinnamomum_verum_spices.jpg',
  },
  {
    id: 2,
    name_en: 'Pepper',
    name_vi: 'Tiêu',
    img_url:
      'https://assets.clevelandclinic.org/transform/65ddb397-7835-4b21-b30b-d123be3cb5c8/blackPepper-185067429-770x533-1_jpg',
  },
  {
    id: 3,
    name_en: 'Turmeric',
    name_vi: 'Nghệ',
    img_url: 'https://m.media-amazon.com/images/I/6143Jp46RpL.jpg',
  },
  {
    id: 4,
    name_en: 'Star Anise',
    name_vi: 'Hoa hồi',
    img_url:
      'https://worldspice.com/cdn/shop/products/900_star_anise_whole.jpg?v=1679373478',
  },
  {
    id: 5,
    name_en: 'Ginger',
    name_vi: 'Gừng',
    img_url:
      'https://fruitboxco.com/cdn/shop/products/Ginger_800x.jpg?v=1588920651',
  },
  {
    id: 6,
    name_en: 'Cardamom',
    name_vi: 'Bạch đậu khấu',
    img_url:
      'https://chefjob.vn/wp-content/uploads/2020/07/cardamom-ten-tieng-viet-la-bach-dau-khau.jpg',
  },
  {
    id: 7,
    name_en: 'Cloves',
    name_vi: 'Đinh hương',
    img_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUR-kj2mypElEd9L1M2lzE4gN2oaIP8zbRUA&s',
  },
  {
    id: 8,
    name_en: 'Fennel Seeds',
    name_vi: 'Hạt thì là',
    img_url:
      'https://hanoismallgoods.com/wp-content/uploads/2021/05/fennel-seeds.jpg',
  },
  {
    id: 9,
    name_en: 'Coriander',
    name_vi: 'Ngò',
    img_url:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcookbook.pfeiffer.net.au%2Fingredient%2Fcoriander-leaves%2F&psig=AOvVaw1RVe43ms9MlRg_S5hMPObF&ust=1728835088531000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKjH_duaiYkDFQAAAAAdAAAAABAE',
  },
  {
    id: 10,
    name_en: 'Basil',
    name_vi: 'Húng quế',
    img_url:
      'https://daylambanh.edu.vn/wp-content/uploads/2019/06/basil-la-gi.jpg',
  },
];
const KitchenSpices = () => {
  const {t} = useTranslation();

  const [listSpices, setListSpices] = useState<ISpice[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleAddListSpice = useCallback(
    (listSpicesAdd: ISpice[]) => {
      const listSpicesNew = listSpices.concat(listSpicesAdd);
      setListSpices(listSpicesNew);
    },
    [listSpices],
  );

  const handleAddSpice = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const handleRemoveSpice = useCallback(
    (id: number) => {
      const listSpicesFiltered = listSpices.filter(spice => spice.id !== id);
      setListSpices(listSpicesFiltered);
    },
    [listSpices],
  );

  const handleCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Typo style={styles.headerLabel}>{t('kitchen.kitchen_spices')}</Typo>
        <IconXML
          icon={PlusCircle}
          width={32}
          height={32}
          onPress={handleAddSpice}
        />
      </View>
      {listSpices.length ? (
        <View style={styles.spicesDisplayContainer}>
          {listSpices.map(spice => (
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
      <ModalAddKitchenSpices
        isVisible={isOpenModal}
        listSpices={listSpicesFake}
        onSubmit={handleAddListSpice}
        onClose={handleCloseModal}
      />
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
  spicesDisplayContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: '12@s',
    columnGap: '8@s',
    paddingVertical: '16@s',
    paddingHorizontal: '4@s',
  },
});
