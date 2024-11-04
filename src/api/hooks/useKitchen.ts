import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import kitchenService from '../services/kitchen.service';
import {useCheckValidToken} from './useAuth';
import {useMemo} from 'react';

export const useKitchenTool = () => {
  const queryFn = useCheckValidToken(kitchenService.getListKitchenTools);
  return useQuery({
    queryKey: ['list_tool'],
    queryFn,
  });
};

export const useKitchenSpice = () => {
  return useQuery({
    queryKey: ['list_spice'],
    queryFn: kitchenService.getLitKitchenSpices,
  });
};

export const useKitchenIngredient = () => {
  const size = useMemo(() => 10, []);

  const queryFunction = useCheckValidToken((page: number) =>
    kitchenService.getListKitchenIngredient(page, size),
  );

  return useInfiniteQuery({
    queryKey: ['list_ingredients'],
    initialPageParam: 0,
    queryFn: ({pageParam}) => queryFunction(pageParam),
    getNextPageParam: lastPage => {
      if (lastPage) {
        if (lastPage.currentPage < lastPage.totalPages - 1) {
          return lastPage.currentPage + 1;
        }
      }
      return null;
    },
  });
};
