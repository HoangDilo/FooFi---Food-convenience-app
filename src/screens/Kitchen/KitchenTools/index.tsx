import {View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {ScaledSheet} from 'react-native-size-matters/extend';
import Typo from '@/components/Typo';
import colorsConstant from '@/constants/colors.constant';
import IconXML from '@/components/IconXML';
import PlusCircle from '@/assets/icons/PlusCircle';
import ModalAddKitchenTools from '@/components/ModalAddKitchenTools';
import {IKitchenToolsAvailable} from '@/types/kitchen.type';
import ItemToolDisplay from './ItemToolDisplay';
import {useTranslation} from 'react-i18next';

const listToolsFake: IKitchenToolsAvailable[] = [
  {
    id: 1,
    name_en: "Chef's Knife",
    name_vi: 'Dao của đầu bếp',
    img_url:
      'https://www.seriouseats.com/thmb/_q6hIdr1n3miFW5GKY8OBQEUfU8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SeriousEats_ZwillingPro8InchChefsKnife_022_DB_1-3x2-ad5c25cad46949e4b5c2fa0d2b6b4cac.jpeg',
  },
  {
    id: 2,
    name_en: 'Cutting Board',
    name_vi: 'Thớt',
    img_url:
      'https://www.lgcoenterprises.com/cdn/shop/products/Cutting_Board_Teakwood_w_Handle_15.7_X_10.6_X_0.7_1024x1024@2x.jpg?v=1612953308',
  },
  {
    id: 3,
    name_en: 'Measuring Cups',
    name_vi: 'Cốc đo lường',
    img_url: 'https://www.oxouk.com/wp-content/uploads/11396800UK_1-scaled.jpg',
  },
  {
    id: 4,
    name_en: 'Whisk',
    name_vi: 'Cây đánh trứng',
    img_url:
      'https://ctluxhome.vn/resize/345/san-pham/danh_trung/thumbnail1_1871136030_cay-danh-trung-wmf-frofi-plus-balloon-whisk-l20cm_2000x2000x345x4.jpg',
  },
  {
    id: 5,
    name_en: 'Saucepan',
    name_vi: 'Nồi',
    img_url:
      'https://www.ikea.com/gb/en/images/products/ikea-365-saucepan-with-lid-stainless-steel__1006179_pe825764_s5.jpg',
  },
  {
    id: 6,
    name_en: 'Frying Pan',
    name_vi: 'Chảo chiên',
    img_url:
      'https://wafuu.com/cdn/shop/products/kai-frying-pan-deep-type-28cm-dw5641-795305.jpg?v=1695255383',
  },
  {
    id: 7,
    name_en: 'Grater',
    name_vi: 'Dụng cụ bào',
    img_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTinivLqzv1NjvNGdqmMtIhx1BZd4i6BmC9sA&s',
  },
  {
    id: 8,
    name_en: 'Peeler',
    name_vi: 'Dao gọt',
    img_url: 'https://images-na.ssl-images-amazon.com/images/I/61p4EhExkSL.jpg',
  },
  {
    id: 9,
    name_en: 'Tongs',
    name_vi: 'Cái kẹp gắp',
    img_url:
      'https://assets.epicurious.com/photos/55943053b2ae6bb2718cae1b/6:4/w_1600%2Cc_limit/shutterstock_108444092-NEW.jpg',
  },
  {
    id: 10,
    name_en: 'Colander',
    name_vi: 'Rổ rá',
    img_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyDxHcSK0WFXAmMEHaCAq5-twLO11bU4vQzw&s',
  },
];

const KitchenTools = () => {
  const {t} = useTranslation();

  const [isOpenModalAddTools, setIsOpenModalAddTools] = useState(false);
  const [listTools, setListTools] = useState<IKitchenToolsAvailable[]>([]);

  const handleAddTool = useCallback(() => {
    setIsOpenModalAddTools(true);
  }, []);

  const handleCloseModalAdd = useCallback(() => {
    setIsOpenModalAddTools(false);
  }, []);

  const handleSubmit = useCallback(
    (listAdd: IKitchenToolsAvailable[]) => {
      setListTools(listTools.concat(listAdd));
    },
    [listTools],
  );

  const handleRemoveTool = useCallback(
    (id: number) => {
      const listToolsFilter = listTools.filter(item => item.id !== id);
      setListTools(listToolsFilter);
    },
    [listTools],
  );

  console.log(listTools.map(item => item.name_en));

  return (
    <View style={styles.toolsContainer}>
      <View style={styles.toolsHeader}>
        <Typo style={styles.headerLabel}>{t('kitchen.kitchen_tools')}</Typo>
        <IconXML
          icon={PlusCircle}
          width={32}
          height={32}
          onPress={handleAddTool}
        />
      </View>
      {listTools.length ? (
        <View style={styles.listTools}>
          {listTools.map(tool => (
            <ItemToolDisplay
              key={tool.id}
              tool={tool}
              onRemoveTool={() => handleRemoveTool(tool.id)}
            />
          ))}
        </View>
      ) : (
        <Typo style={styles.emptyTools}>{t('kitchen.empty_tools')}</Typo>
      )}
      <ModalAddKitchenTools
        isVisible={isOpenModalAddTools}
        listToolsAvailable={listToolsFake}
        onClose={handleCloseModalAdd}
        onSubmit={handleSubmit}
      />
    </View>
  );
};

export default KitchenTools;

const styles = ScaledSheet.create({
  toolsContainer: {},
  toolsHeader: {
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
  listTools: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: '12@s',
    columnGap: '8@s',
    paddingVertical: '16@s',
    paddingHorizontal: '4@s',
  },
  emptyTools: {
    fontSize: '14@s',
    color: colorsConstant.gray_2,
    marginTop: '8@s',
    textAlign: 'right',
    paddingHorizontal: '8@s',
  },
});
