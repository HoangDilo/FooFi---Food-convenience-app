import {configureStore} from '@reduxjs/toolkit';

import systemReducer from './reducers/system.reducer';
import myReducer from './reducers/my.reducer';

export const store = configureStore({
  reducer: {
    system: systemReducer,
    my: myReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
