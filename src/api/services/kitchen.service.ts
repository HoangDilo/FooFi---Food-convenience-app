import {
  IIngredient,
  IKitchenToolsAvailable,
  ISpice,
} from '@/types/kitchen.type';
import {apiClientToken} from '..';

export default {
  getListKitchenTools(): Promise<IKitchenToolsAvailable[]> {
    return apiClientToken.get('/tool/list');
  },
  getLitKitchenSpices(): Promise<ISpice[]> {
    return apiClientToken.get('/spice/list');
  },
  getListKitchenIngredient(): Promise<IIngredient[]> {
    return apiClientToken.get('/ingredient/list');
  },
  getUserListKitchenTools(): Promise<IKitchenToolsAvailable[]> {
    return apiClientToken.get();
  },
};
