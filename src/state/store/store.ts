import { configureStore } from '@reduxjs/toolkit';
import stakingBknInfoReducer from '../slices/stakingBknInfoSlice';

export const store = configureStore({
  reducer: {
    stakingBknInfo: stakingBknInfoReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
