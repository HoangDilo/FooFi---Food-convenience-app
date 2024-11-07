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
    return apiClientToken.get('/spice/user/spice/not-added');
  },
  getListKitchenIngredient(
    page: number,
    size: number,
  ): Promise<IPaginationResponse<IIngredient>> {
    return apiClientToken.get(
      `ingredient/user/ingredient/not-added?page=${page}&size=${size}`,
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
    return apiClientToken.get('/spice/user/spice/list');
  },
  addUserKitchenSpice(spices: ISpice[]): Promise<ISpice[]> {
    const spiceIds = spices.map(item => item.id);
    return apiClientToken.post('/spice/user/spice', spiceIds);
  },
  deleteUserTool(toolId: number): Promise<IKitchenToolsAvailable> {
    return apiClientToken.delete(`/tool/user/tool/${toolId}`);
  },
  deleteUserSpice(spiceId: number): Promise<ISpice> {
    return apiClientToken.delete(`/spice/user/spice/${spiceId}`);
  },
  getUserListKitchenIngredients(
    page: number,
    size: number,
  ): Promise<IPaginationResponse<IIngredient>> {
    return apiClientToken.get(
      `/ingredient/user/ingredient/list?page=${page}&size=${size}`,
    );
  },
  editIngredientQuantity(payload: {
    id: number;
    quantity: number;
  }): Promise<IIngredient> {
    console.log('abc');

    return apiClientToken.put(`/ingredient/user/ingredient`, payload);
  },
  deleteUserIngredient(id: number): Promise<IIngredient> {
    return apiClientToken.delete(`/ingredient/user/ingredient/${id}`);
  },
  addUserIngredient(ingredient: IIngredient): Promise<IIngredient> {
    return apiClientToken.post('ingredient/user/ingredient', {
      id: ingredient.id,
      quantity: ingredient.quantity,
    });
  },
};
