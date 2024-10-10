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
  unit: string;
  quantity: number;
}
