import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../utils/store";

export interface AppState {
  isLoading: boolean;
}

const initialState: AppState = {
  isLoading: true,
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    resetState: () => initialState,
  },
});

/**
 * Action exports
 */
export const { setIsLoading, resetState } = appStateSlice.actions;

/**
 * Selectors
 */
export const selectIsLoading = (state: RootState) => state.auth.isLoading;

/**
 * Reducer export
 */
export default appStateSlice.reducer;
