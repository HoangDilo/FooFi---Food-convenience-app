import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const systemSliceInitialState = {
  isScrolling: false,
  isBottomTabHidden: false,
};

export const systemSlice = createSlice({
  name: 'system',
  initialState: systemSliceInitialState,
  reducers: {
    setIsScrolling: (state, action: PayloadAction<boolean>) => {
      state.isScrolling = action.payload;
    },
    setIsBottomTabHidden: (state, action: PayloadAction<boolean>) => {
      state.isBottomTabHidden = action.payload;
    },
  },
});

export const {setIsScrolling, setIsBottomTabHidden} = systemSlice.actions;

export default systemSlice.reducer;
