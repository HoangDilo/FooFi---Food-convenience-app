export type RootStackParamList = {
  main_tab: undefined;
  instruction: {
    dish_id: number;
  };
  search?: {
    query?: string;
    listItemsFilter?: string[];
  };
  add_post: undefined;
  dish_details: {
    post_id: number;
    is_standard: boolean;
    description: string;
    published_time: string;
    user_info: {
      name: string;
      avt_url: string;
    };
    dish_info: {
      name: string;
      img_url: string;
      duration: number;
    };
  };
};

export type MainTabParamList = {
  home_tab: undefined;
  other_chefs: undefined;
  kitchen: undefined;
  chat_bot: undefined;
  my: {
    id: number;
  };
};
