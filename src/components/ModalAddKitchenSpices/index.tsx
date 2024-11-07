import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableHighlight,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import ModalRemake from '../ModalRemake';
import Typo from '../Typo';
import ItemSpiceSelect from './ItemSpiceSelect';
import {ISpice} from '@/types/kitchen.type';
import {ScaledSheet, verticalScale} from 'react-native-size-matters/extend';
import colorsConstant from '@/constants/colors.constant';
import {useTranslation} from 'react-i18next';
import SearchKitchen from '../SearchKitchen';
import {useQueryClient} from '@tanstack/react-query';

interface IModalAddKitchenSpicesProps {
  isVisible: boolean;
  listSpices?: ISpice[];
  onClose: () => void;
  onSubmit: (listSpicesAdd: ISpice[]) => void;
}

const ModalAddKitchenSpices = ({
  isVisible,
  listSpices = [],
  onClose,
  onSubmit,
}: IModalAddKitchenSpicesProps) => {
  const {t, i18n} = useTranslation();
  const queryClient = useQueryClient();

  const [listSpicesAdd, setListSpicesAdd] = useState<ISpice[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const listSpicesSearch = useMemo(() => {
    const query = searchValue.toLocaleLowerCase();
    const listSpicesFound = listSpices.filter(spice =>
      spice[`name_${i18n.language}` as keyof ISpice]
        .toString()
        .toLocaleLowerCase()
        .includes(query),
    );
    return listSpicesFound;
  }, [i18n.language, listSpices, searchValue]);

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
    setSearchValue('');
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

  const handleChangeSearch = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  useEffect(() => {
    isVisible && queryClient.refetchQueries({queryKey: ['list_spices']});
  }, [isVisible, queryClient]);

  return (
    <ModalRemake isVisible={isVisible}>
      {isVisible && (
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={verticalScale(32)}>
          <View style={styles.modalAddSpice}>
            <Typo style={styles.addSpiceTitle}>{t('kitchen.add_spice')}</Typo>
            <SearchKitchen
              value={searchValue}
              onChange={handleChangeSearch}
              placeholderName={t('kitchen.kitchen_spices').toLocaleLowerCase()}
            />
            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewContainer}
              keyboardShouldPersistTaps="handled">
              {listSpicesSearch.map(spice => (
                <ItemSpiceSelect
                  key={spice.id}
                  isActive={!!listSpicesAdd.find(item => item.id === spice.id)}
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
        </KeyboardAvoidingView>
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
  },
  scrollView: {
    maxHeight: '300@s',
    height: '300@s',
    marginTop: '8@s',
  },
  scrollViewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: '12@s',
    columnGap: '8@s',
    paddingBottom: '8@s',
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
