export type RootStackParamList = {
  main_tab: undefined;
  instruction: {
    dish_id: number;
  };
  search?: {
    query?: string;
    listItemsFilter?: string[];
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
