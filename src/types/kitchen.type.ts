export interface IKitchenToolsAvailableResponse {
  data: IKitchenToolsAvailable[];
}

export interface IKitchenToolsAvailable {
  id: number;
  name_en: string;
  name_vi: string;
  img_url: string;
}
