import {View} from 'react-native';
import React, {useMemo} from 'react';
import Typo from '../Typo';
import {useTranslation} from 'react-i18next';
import colorsConstant from '@/constants/colors.constant';
import {scale, ScaledSheet} from 'react-native-size-matters/extend';
import IconXML from '../IconXML';
import Caret from '@/assets/icons/Caret';
import CaretDisabled from '@/assets/icons/CaretDisabled';

interface IPaginationProps {
  currentPage: number;
  currentPageItemCount: number;
  totalCount: number;
  limit: number;
  nameItem: string;
  onGoNext: () => void;
  onGoPrevious: () => void;
}

const Pagination = ({
  currentPage,
  currentPageItemCount,
  totalCount,
  limit,
  nameItem,
  onGoNext,
  onGoPrevious,
}: IPaginationProps) => {
  const {t} = useTranslation();

  const startCount = useMemo(() => {
    return currentPage * limit + 1;
  }, [currentPage, limit]);
  const endCount = useMemo(() => {
    return currentPageItemCount < limit &&
      totalCount === (currentPage + 1) * limit
      ? currentPage * limit + limit
      : totalCount;
  }, [currentPage, currentPageItemCount, limit, totalCount]);

  const ableGoPrevious = useMemo(() => currentPage > 0, [currentPage]);

  const ableGoNext = useMemo(
    () => (currentPage + 1) * limit < totalCount,
    [currentPage, limit, totalCount],
  );

  console.log(ableGoPrevious);

  return (
    <View style={styles.pagination}>
      <Typo style={styles.paginationText}>
        {t('pagination', {
          start: startCount,
          end: endCount,
          name: nameItem,
          total: totalCount,
        })}
      </Typo>
      <View style={styles.buttonContainer}>
        <IconXML
          icon={ableGoPrevious ? Caret : CaretDisabled}
          width={scale(20)}
          height={scale(20)}
          style={{
            transform: [
              {
                rotate: '180deg',
              },
            ],
          }}
          onPress={() => ableGoPrevious && onGoPrevious()}
        />
        <IconXML
          icon={ableGoNext ? Caret : CaretDisabled}
          width={scale(20)}
          height={scale(20)}
          onPress={() => ableGoNext && onGoNext()}
        />
      </View>
    </View>
  );
};

export default Pagination;

const styles = ScaledSheet.create({
  pagination: {
    flexDirection: 'row',
    gap: '12@s',
    justifyContent: 'flex-end',
    marginTop: '8@s',
    paddingHorizontal: '12@s',
  },
  paginationText: {
    color: colorsConstant.gray_1,
    fontSize: '14@s',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: '6@s',
  },
});
