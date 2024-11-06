import {
  IIngredient,
  IKitchenToolsAvailable,
  IPaginationResponse,
  ISpice,
} from '@/types/kitchen.type';
import {apiClientToken} from '..';

export default {
  getListKitchenTools(): Promise<IKitchenToolsAvailable[]> {
    return apiClientToken.get('/tool/user/tool/not-added');
  },
  getLitKitchenSpices(): Promise<ISpice[]> {
    return apiClientToken.get('/spice/user/not-added');
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
    return apiClientToken.get('/tool/user/tool/list');
  },
  addUserKitchenTools(
    tools: IKitchenToolsAvailable[],
  ): Promise<IKitchenToolsAvailable> {
    const toolIds = tools.map(item => item.id);
    return apiClientToken.post('/tool/user/tool', toolIds);
  },
  getUserListKitchenSpices(): Promise<ISpice[]> {
    return apiClientToken.get('/spice/user/list');
  },
};
