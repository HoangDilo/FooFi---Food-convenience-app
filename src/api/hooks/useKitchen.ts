import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import kitchenService from '../services/kitchen.service';
import {useCheckValidToken} from './useAuth';
import {useMemo} from 'react';
import {IKitchenToolsAvailable, ISpice} from '@/types/kitchen.type';

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
        const oldClone = JSON.parse(JSON.stringify(old));
        return [...oldClone, ...optimistic];
      });
      return {optimistic};
    },
    onError: (result, variables, context) => {
      queryClient.setQueriesData({queryKey: ['user_tools']}, old => {
        const oldClone = JSON.parse(
          JSON.stringify(old),
        ) as IKitchenToolsAvailable[];
        return oldClone.filter(
          item => !context?.optimistic.some(itemOp => itemOp.id === item.id),
        );
      });
    },
  });
};

export const useDeleteKitchenTool = () => {
  const mutationFn = useCheckValidToken(kitchenService.deleteUserTool);
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete_tools'],
    mutationFn,
    onMutate: toolId => {
      let oldList: IKitchenToolsAvailable[] = [];
      queryClient.setQueriesData({queryKey: ['user_tools']}, old => {
        const oldClone = JSON.parse(
          JSON.stringify(old),
        ) as IKitchenToolsAvailable[];
        oldList = oldClone;
        return oldClone.filter(item => item.id !== toolId);
      });
      return {oldList};
    },
    onError: (result, variables, context) => {
      queryClient.setQueriesData({queryKey: ['user_tools']}, () => {
        return context?.oldList;
      });
    },
  });
};

export const useUserKitchenSpices = () => {
  const queryFn = useCheckValidToken(kitchenService.getUserListKitchenSpices);
  return useQuery({
    queryKey: ['user_spices'],
    queryFn,
  });
};

export const useAddUserKitchenSpice = () => {
  const mutationFn = useCheckValidToken(kitchenService.addUserKitchenSpice);
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['add_spices'],
    mutationFn,
    onMutate: spices => {
      const optimistic = spices;
      queryClient.setQueriesData({queryKey: ['user_spices']}, old => {
        const oldClone = JSON.parse(JSON.stringify(old)) as ISpice[];
        return [...oldClone, ...optimistic];
      });
      return {optimistic};
    },
    onError: (error, variables, context) => {
      queryClient.setQueriesData({queryKey: ['user_spices']}, old => {
        const oldClone = JSON.parse(JSON.stringify(old)) as ISpice[];
        return oldClone.filter(
          item => !context?.optimistic.some(itemOp => itemOp.id !== item.id),
        );
      });
    },
  });
};

export const useDeleteUserKitchenSpice = () => {
  const mutationFn = useCheckValidToken(kitchenService.deleteUserSpice);
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete_spice'],
    mutationFn,
    onMutate: spiceId => {
      let oldList: ISpice[] = [];
      queryClient.setQueriesData({queryKey: ['user_spices']}, old => {
        const oldClone = JSON.parse(JSON.stringify(old)) as ISpice[];
        oldList = oldClone;
        return oldClone.filter(item => item.id !== spiceId);
      });
      return {oldList};
    },
    onError: (error, variables, context) => {
      queryClient.setQueriesData({queryKey: ['user_spices']}, () => {
        return context?.oldList;
      });
    },
  });
};

export const useUserIngredients = (page: number) => {
  const queryFunction = useCheckValidToken(
    kitchenService.getUserListKitchenIngredients,
  );
  return useQuery({
    queryKey: ['user_ingredients', page],
    queryFn: () => queryFunction(page, 5),
    placeholderData: keepPreviousData,
  });
};
