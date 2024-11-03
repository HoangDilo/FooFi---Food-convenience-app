import {useQuery} from '@tanstack/react-query';
import kitchenService from '../services/kitchen.service';

export const useKitchenTool = () => {
  return useQuery({
    queryKey: ['list_tool'],
    queryFn: kitchenService.getListKitchenTools,
  });
};

export const useKitchenSpice = () => {
  return useQuery({
    queryKey: ['list_spice'],
    queryFn: kitchenService.getLitKitchenSpices,
  });
};

export const useKitchenIngredient = () => {
  return useQuery({
    queryKey: ['list_ingredient'],
    queryFn: kitchenService.getListKitchenIngredient,
  });
};
