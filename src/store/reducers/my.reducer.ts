import {ELanguage} from '@/enums/user.enum';
import {IUserInfo} from '@/types/auth.type';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IInitState {
  access_token: string;
  user_info: {
    id: number;
    mail: string;
    name: string;
    avatar_url: string;
    language: ELanguage;
  };
  language: '';
}

const initState: IInitState = {
  access_token: '',
  user_info: {
    id: 0,
    mail: '',
    name: '',
    avatar_url: '',
    language: ELanguage.EN,
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
