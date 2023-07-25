import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import appStateReducer from "../slices/appStateSlice";
import authReducer from "../slices/authSlice";
// import configReducer from "../slices/configSlice";
// import dataReducer from "../slices/dataSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    appState: appStateReducer,
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
