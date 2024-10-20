export interface IPost {
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
