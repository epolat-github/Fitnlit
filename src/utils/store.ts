import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
// import configReducer from "../slices/configSlice";
// import dataReducer from "../slices/dataSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // data: dataReducer,
    // config: configReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
