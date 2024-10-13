import {ScrollView, TouchableHighlight, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import ModalRemake from '../ModalRemake';
import Typo from '../Typo';
import ItemSpiceSelect from './ItemSpiceSelect';
import {ISpice} from '@/types/kitchen.type';
import {ScaledSheet, verticalScale} from 'react-native-size-matters/extend';
import colorsConstant from '@/constants/colors.constant';
import {useTranslation} from 'react-i18next';
import SearchKitchen from '../SearchKitchen';

interface IModalAddKitchenSpicesProps {
  isVisible: boolean;
  listSpices: ISpice[];
  onClose: () => void;
  onSubmit: (listSpicesAdd: ISpice[]) => void;
}

const ModalAddKitchenSpices = ({
  isVisible,
  listSpices,
  onClose,
  onSubmit,
}: IModalAddKitchenSpicesProps) => {
  const {t} = useTranslation();

  const [listSpicesAdd, setListSpicesAdd] = useState<ISpice[]>([]);

  const handleSelectSpice = useCallback(
    (spice: ISpice) => {
      const listSpicesAddClone = JSON.parse(JSON.stringify(listSpicesAdd));
      listSpicesAddClone.push(spice);
      setListSpicesAdd(listSpicesAddClone);
    },
    [listSpicesAdd],
  );
  const handleCloseModal = useCallback(() => {
    onClose();
    setListSpicesAdd([]);
  }, [onClose]);

  const handleAddAllSpices = useCallback(() => {
    onSubmit(listSpicesAdd);
    handleCloseModal();
  }, [listSpicesAdd, handleCloseModal, onSubmit]);

  const handleRemoveSpice = useCallback(
    (id: number) => {
      setListSpicesAdd(listSpicesAdd.filter(spice => spice.id !== id));
    },
    [listSpicesAdd],
  );

  return (
    <ModalRemake isVisible={isVisible}>
      {isVisible && (
        <View style={styles.modalAddSpice}>
          <Typo style={styles.addSpiceTitle}>{t('kitchen.add_spice')}</Typo>
          <SearchKitchen />
          <ScrollView
            style={{maxHeight: verticalScale(280)}}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContainer}>
            {listSpices.map(spice => (
              <ItemSpiceSelect
                key={spice.id}
                spice={spice}
                onSelectSpice={() => handleSelectSpice(spice)}
                onUnselectSpice={() => handleRemoveSpice(spice.id)}
              />
            ))}
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Typo onPress={handleCloseModal} style={styles.cancel}>
              {t('cancel')}
            </Typo>
            <TouchableHighlight
              onPress={handleAddAllSpices}
              style={styles.addWrapper}
              underlayColor={colorsConstant.primary_press}>
              <Typo style={styles.add}>{t('Add')}</Typo>
            </TouchableHighlight>
          </View>
        </View>
      )}
    </ModalRemake>
  );
};

export default ModalAddKitchenSpices;

const styles = ScaledSheet.create({
  modalAddSpice: {
    backgroundColor: colorsConstant.background,
    padding: '24@s',
    borderRadius: '10@s',
    gap: '12@s',
  },
  addSpiceTitle: {
    fontWeight: '600',
    fontSize: '16@s',
    color: colorsConstant.black_1,
    marginTop: '4@s',
    marginBottom: '4@s',
  },
  scrollViewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: '12@s',
    columnGap: '8@s',
    paddingVertical: '8@s',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: '16@s',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: '12@s',
  },
  cancel: {
    color: colorsConstant.primary,
    fontSize: '16@s',
    fontWeight: '500',
  },
  addWrapper: {
    backgroundColor: colorsConstant.primary,
    paddingHorizontal: '12@s',
    borderRadius: 999,
    paddingVertical: '6@s',
  },
  add: {
    color: '#FFF',
    fontSize: '16@s',
    fontWeight: '600',
  },
});
