import {IUserInfo} from '@/types/user.type';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initState = {
  access_token: '',
  user_info: {
    email: '',
    name: '',
    avatar_url: '',
  },
  language: '',
};

export const mySlice = createSlice({
  name: 'my',
  initialState: initState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.access_token = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<IUserInfo>) => {
      state.user_info = action.payload;
    },
    setUserLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const {setAccessToken, setUserInfo, setUserLanguage} = mySlice.actions;

export default mySlice.reducer;
