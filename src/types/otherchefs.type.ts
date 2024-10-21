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

export interface IDishDetailsInfo {
  post: IPost;
  list_ingredient: IIngredient[];
  list_spices: ISpice[];
  list_tools: IKitchenToolsAvailable[];
}
