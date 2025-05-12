import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import appStateReducer from "../slices/appStateSlice";
import authReducer from "../slices/authSlice";
import goalsReducer from "../slices/goalsSlice";
import programsReducer from "../slices/programsSlice";
import workoutsReducer from "../slices/workoutsSlice";
// import configReducer from "../slices/configSlice";
// import dataReducer from "../slices/dataSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    appState: appStateReducer,
    workouts: workoutsReducer,
    goals: goalsReducer,
    programs: programsReducer,
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
