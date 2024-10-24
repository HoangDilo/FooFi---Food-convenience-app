import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initState = {
  access_token: '',
};

export const mySlice = createSlice({
  name: 'my',
  initialState: initState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.access_token = action.payload;
    },
  },
});

export const {setAccessToken} = mySlice.actions;

export default mySlice.reducer;
