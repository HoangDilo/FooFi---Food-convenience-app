import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import kitchenService from '../services/kitchen.service';
import {useCheckValidToken} from './useAuth';
import {useMemo} from 'react';

export const useKitchenTool = () => {
  const queryFn = useCheckValidToken(kitchenService.getListKitchenTools);
  return useQuery({
    queryKey: ['list_tools'],
    queryFn,
  });
};

export const useKitchenSpice = () => {
  return useQuery({
    queryKey: ['list_spices'],
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

export const useUserKitchenTool = () => {
  const queryFn = useCheckValidToken(kitchenService.getUserListKitchenTools);
  return useQuery({
    queryKey: ['user_tools'],
    queryFn,
  });
};

export const useAddUserKitchenTool = () => {
  const mutationFn = useCheckValidToken(kitchenService.addUserKitchenTools);
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['add_tools'],
    mutationFn,
    onMutate: tools => {
      const optimistic = tools;
      queryClient.setQueriesData({queryKey: ['user_tools']}, old => {
        return [...old, optimistic];
      });
      return {optimistic};
    },
    onSuccess: () => {},
  });
};

export const useUserSpice = () => {
  const queryFn = useCheckValidToken(kitchenService.)
}
