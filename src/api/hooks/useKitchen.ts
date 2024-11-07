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
import {
  IIngredient,
  IKitchenToolsAvailable,
  IPaginationResponse,
  ISpice,
} from '@/types/kitchen.type';
import Toast from 'react-native-toast-message';
import {useTranslation} from 'react-i18next';

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

export const useEditUserIngredient = (page: number) => {
  const mutationFn = useCheckValidToken(kitchenService.editIngredientQuantity);
  const queryClient = useQueryClient();
  const {t} = useTranslation();

  return useMutation({
    mutationKey: ['edit_ingredient'],
    mutationFn,
    onMutate: payload => {
      queryClient.setQueryData(['user_ingredients', page], old => {
        const oldClone = JSON.parse(
          JSON.stringify(old),
        ) as IPaginationResponse<IIngredient>;
        const ingredientFound = oldClone.data.find(
          item => item.id === payload.id,
        );
        if (ingredientFound) {
          ingredientFound.quantity = payload.quantity;
        }
        return oldClone;
      });
      return {quantity: payload.quantity};
    },
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: t('toast.edit_ingredient_success'),
      });
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: t('toast.edit_ingredient_error'),
      });
    },
  });
};

export const useAddUserIngredient = (lastPage: number, currentPage: number) => {
  const mutationFn = useCheckValidToken(kitchenService.addUserIngredient);
  const queryClient = useQueryClient();
  const {t} = useTranslation();
  return useMutation({
    mutationKey: ['add_ingredient'],
    mutationFn,
    onMutate: ingredient => {
      queryClient.setQueryData(['user_ingredients', lastPage], old => {
        const oldClone = JSON.parse(
          JSON.stringify(old),
        ) as IPaginationResponse<IIngredient>;
        oldClone.data.push(ingredient);
        oldClone.totalItems = oldClone.totalItems + 1;
        return oldClone;
      });
      queryClient.setQueriesData(
        {queryKey: ['user_ingredients', currentPage]},
        old => {
          const oldClone = JSON.parse(
            JSON.stringify(old),
          ) as IPaginationResponse<IIngredient>;
          oldClone.totalPages = oldClone.totalPages + 1;
          return oldClone;
        },
      );
      return {id: ingredient.id};
    },
    onSuccess: () => {
      queryClient.refetchQueries();
      Toast.show({
        type: 'success',
        text1: t('toast.add_ingredient_success'),
      });
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: t('toast.add_ingredient_error'),
      });
    },
  });
};

export const useDeleteUserIngredient = (page: number) => {
  const mutationFn = useCheckValidToken(kitchenService.deleteUserIngredient);
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete_ingredient'],
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['user_ingredients', page]});
    },
  });
};
