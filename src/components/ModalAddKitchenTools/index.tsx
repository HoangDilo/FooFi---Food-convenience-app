import {ScrollView, TouchableHighlight, View} from 'react-native';
import React, {memo, useCallback, useState} from 'react';
import {ScaledSheet, verticalScale} from 'react-native-size-matters/extend';
import Typo from '../Typo';
import ModalRemake from '../ModalRemake';
import colorsConstant from '@/constants/colors.constant';
import {IKitchenToolsAvailable} from '@/types/kitchen.type';
import ItemToolSelect from './ItemToolSelect';
import {useTranslation} from 'react-i18next';

interface IModalAddKitchenToolsProps {
  isVisible: boolean;
  listToolsAvailable: IKitchenToolsAvailable[];
  onClose: () => void;
  onSubmit: (listToolsAdd: IKitchenToolsAvailable[]) => void;
}

const ModalAddKitchenTools = ({
  isVisible,
  listToolsAvailable,
  onClose,
  onSubmit,
}: IModalAddKitchenToolsProps) => {
  const {t} = useTranslation();

  const [listToolsSelected, setListToolsSelected] = useState<
    IKitchenToolsAvailable[]
  >([]);

  console.log(listToolsSelected.map(item => item.name_en));

  const handleCloseModal = useCallback(() => {
    setListToolsSelected([]);
    onClose();
  }, [onClose]);

  const handleAddTool = useCallback(
    (tool: IKitchenToolsAvailable) => {
      const listToolsClone = JSON.parse(
        JSON.stringify(listToolsSelected),
      ) as IKitchenToolsAvailable[];
      listToolsClone.push(tool);
      setListToolsSelected(listToolsClone);
    },
    [listToolsSelected],
  );

  const handleRemoveTool = useCallback(
    (id: number) => {
      const listToolsFiltered = listToolsSelected.filter(
        item => item.id !== id,
      );
      setListToolsSelected(listToolsFiltered);
    },
    [listToolsSelected],
  );

  const handleAddAllTools = useCallback(() => {
    listToolsSelected.length && onSubmit(listToolsSelected);
    handleCloseModal();
  }, [handleCloseModal, listToolsSelected, onSubmit]);

  return (
    <ModalRemake isVisible={isVisible}>
      {isVisible && (
        <View style={styles.addToolsContainer}>
          <Typo style={styles.title}>{t('kitchen.add_tools')}</Typo>
          <ScrollView
            style={{maxHeight: verticalScale(280)}}
            showsVerticalScrollIndicator={false}>
            <View style={styles.toolsContainer}>
              {listToolsAvailable.map(tool => (
                <ItemToolSelect
                  key={tool.id}
                  tool={tool}
                  onSelectTool={() => handleAddTool(tool)}
                  onUnselectTool={() => handleRemoveTool(tool.id)}
                />
              ))}
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Typo onPress={handleCloseModal} style={styles.cancel}>
              Cancel
            </Typo>
            <TouchableHighlight
              onPress={handleAddAllTools}
              style={styles.addWrapper}
              underlayColor={colorsConstant.primary_press}>
              <Typo style={styles.add}>Add</Typo>
            </TouchableHighlight>
          </View>
        </View>
      )}
    </ModalRemake>
  );
};

export default memo(ModalAddKitchenTools);

const styles = ScaledSheet.create({
  addToolsContainer: {
    backgroundColor: colorsConstant.background,
    padding: '20@s',
    borderRadius: '10@s',
    gap: '12@s',
  },
  title: {
    fontWeight: '600',
    fontSize: '16@s',
    color: colorsConstant.black_1,
    marginTop: '4@s',
    marginBottom: '4@s',
  },
  toolsContainer: {
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
  scrollViewIndicator: {
    color: colorsConstant.gray_2,
  },
});
