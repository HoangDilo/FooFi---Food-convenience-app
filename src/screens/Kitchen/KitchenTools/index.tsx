import {ActivityIndicator, View} from 'react-native';
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
import {
  useAddUserKitchenTool,
  useKitchenTool,
  useUserKitchenTool,
} from '@/api/hooks/useKitchen';

const KitchenTools = () => {
  const {t} = useTranslation();

  const [isOpenModalAddTools, setIsOpenModalAddTools] = useState(false);
  const dataTool = useKitchenTool();
  const {data, isPending} = useUserKitchenTool();
  const {mutate} = useAddUserKitchenTool();

  const handleAddTool = useCallback(() => {
    setIsOpenModalAddTools(true);
  }, []);

  const handleCloseModalAdd = useCallback(() => {
    setIsOpenModalAddTools(false);
  }, []);

  const handleSubmit = useCallback((listAdd: IKitchenToolsAvailable[]) => {
    mutate(listAdd.map(item => item.id));
    setListTools(listTools.concat(listAdd));
  }, []);

  const handleRemoveTool = useCallback((id: number) => {

  }, []);

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
      {!isPending ? (
        <>
          {data?.length ? (
            <View style={styles.listTools}>
              {data.map(tool => (
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
        </>
      ) : (
        <ActivityIndicator style={styles.loadingIcon} />
      )}

      <ModalAddKitchenTools
        isVisible={isOpenModalAddTools}
        listToolsAvailable={dataTool.data}
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
  loadingIcon: {
    paddingVertical: '16@s',
    paddingHorizontal: '4@s',
  },
});
