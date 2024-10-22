import {IIngredient, IKitchenToolsAvailable, ISpice} from './kitchen.type';

export interface IPost {
  id: number;
  is_standard: boolean;
  description?: string;
  published_time: string;
  likes?: number;
  is_liked?: boolean;
  language: string;
  user_info?: {
    id: number;
    name: string;
    avt_url: string;
  };
  dish_info: {
    id: number;
    name: string;
    img_url: string;
    duration: number;
  };
}

export interface IIngredientCheck extends IIngredient {
  is_available: boolean;
}

export interface ISpiceCheck extends ISpice {
  is_available: boolean;
}

export interface IKitchenToolsAvailableCheck extends IKitchenToolsAvailable {
  is_available: boolean;
}

export interface IDishDetailsInfo {
  post: IPost;
  list_ingredient: IIngredientCheck[];
  list_spices: ISpiceCheck[];
  list_tools: IKitchenToolsAvailableCheck[];
}
