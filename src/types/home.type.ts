export interface IDishesBySession {
  id: number;
  img_url: string;
  duration?: number;
  name: string;
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
  description: string;
  published_time: string;
  likes: number;
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
