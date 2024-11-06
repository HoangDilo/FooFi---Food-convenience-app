import {ActivityIndicator, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {scale, ScaledSheet} from 'react-native-size-matters/extend';
import Typo from '@/components/Typo';
import colorsConstant from '@/constants/colors.constant';
import IconXML from '@/components/IconXML';
import ModalAddKitchenTools from '@/components/ModalAddKitchenTools';
import {IKitchenToolsAvailable} from '@/types/kitchen.type';
import ItemToolDisplay from './ItemToolDisplay';
import {useTranslation} from 'react-i18next';
import {
  useAddUserKitchenTool,
  useKitchenTool,
  useUserKitchenTool,
} from '@/api/hooks/useKitchen';
import FastImage from 'react-native-fast-image';
import {deviceWidth} from '@/constants/device.constant';
import PlusWhite from '@/assets/icons/PlusWhite';

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

  const handleRemoveTool = useCallback((id: number) => {}, []);

  return (
    <View style={styles.toolsContainer}>
      <View style={styles.toolsHeader}>
        <Typo style={styles.headerLabel}>{t('kitchen.kitchen_tools')}</Typo>
        <IconXML
          icon={PlusWhite}
          width={32}
          height={32}
          onPress={handleAddTool}
        />
        <FastImage
          source={require('@/assets/images/kitchentool.jpg')}
          style={styles.backgroundImg}
        />
        <View style={styles.blackCover} />
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
    position: 'relative',
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
    overflow: 'hidden',
  },
  headerLabel: {
    fontSize: '20@s',
    fontWeight: '600',
    color: '#FFF',
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
  backgroundImg: {
    height: '60@s',
    width: deviceWidth - 2 * scale(24),
    position: 'absolute',
    top: 0,
    zIndex: -1,
  },
  blackCover: {
    backgroundColor: '#00000060',
    position: 'absolute',
    height: '60@s',
    width: deviceWidth - 2 * scale(24),
    zIndex: -1,
  },
});
