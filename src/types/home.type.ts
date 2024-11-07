export interface IDishesBySession {
  id: number;
  is_standard: boolean;
  description?: string;
  published_time?: string;
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

export interface IRecommendForYouResponse {
  data: {
    id: number;
    name: string;
    img_url: string;
    duration: number;
    description: string;
  };
}

export interface IRecommendPostItem {
  id: number;
  is_standard: boolean;
  description: string;
  published_time: string;
  likes: number;
  is_liked: boolean;
  language: string;
  user_info: {
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
