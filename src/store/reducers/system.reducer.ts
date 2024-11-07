import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const systemSliceInitialState = {
  isScrolling: false,
  isBottomTabHidden: false,
  isBottomSheetShowing: false,
  currentRoute: '',
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
    setIsBottomSheetShowing: (state, action: PayloadAction<boolean>) => {
      state.isBottomSheetShowing = action.payload;
    },
    setCurrentRoute: (state, action: PayloadAction<string>) => {
      state.currentRoute = action.payload;
    },
  },
});

export const {
  setIsScrolling,
  setIsBottomTabHidden,
  setIsBottomSheetShowing,
  setCurrentRoute,
} = systemSlice.actions;

export default systemSlice.reducer;
