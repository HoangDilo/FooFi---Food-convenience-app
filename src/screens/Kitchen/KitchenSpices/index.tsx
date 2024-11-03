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
import {useKitchenSpice} from '@/api/hooks/useKitchen';

const KitchenSpices = () => {
  const {t} = useTranslation();

  const [listSpices, setListSpices] = useState<ISpice[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dataSpices = useKitchenSpice();

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
        listSpices={dataSpices.data}
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
