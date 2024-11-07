import {EUnit} from '@/enums/kitchen.enum';

export interface IKitchenToolsAvailableResponse {
  data: IKitchenToolsAvailable[];
}

export interface IKitchenToolsAvailable {
  id: number;
  name_en: string;
  name_vi: string;
  img_url: string;
}

export interface ISpice {
  id: number;
  name_en: string;
  name_vi: string;
  img_url: string;
}

export interface IIngredient {
  id: number;
  name_en: string;
  name_vi: string;
  img_url: string;
  unit: EUnit | null;
  quantity: number;
}

export interface IListToolsResponse {
  data: IKitchenToolsAvailable[];
}

export interface IPaginationResponse<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}
