import {
  IIngredient,
  IKitchenToolsAvailable,
  IPaginationResponse,
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
  getListKitchenIngredient(
    page: number,
    size: number,
  ): Promise<IPaginationResponse<IIngredient>> {
    return apiClientToken.get(
      `ingredient/paginated-list?page=${page}&size=${size}`,
    );
  },
  getUserListKitchenTools(): Promise<IKitchenToolsAvailable[]> {
    return apiClientToken.get('');
  },
};
