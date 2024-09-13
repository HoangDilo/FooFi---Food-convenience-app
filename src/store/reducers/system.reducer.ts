import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const systemSliceInitialState = {
  isScrolling: false,
};

export const systemSlice = createSlice({
  name: 'system',
  initialState: systemSliceInitialState,
  reducers: {
    setIsScrolling: (state, action: PayloadAction<boolean>) => {
      state.isScrolling = action.payload;
    },
  },
});

export const {setIsScrolling} = systemSlice.actions;

export default systemSlice.reducer;
