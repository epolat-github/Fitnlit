import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../utils/store";

export interface WorkoutsState {
  dayItemsYPosition: (number | undefined)[];
}

const initialState: WorkoutsState = {
  dayItemsYPosition: [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ],
};

export const workoutsSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {
    setDayItemsYPosition: (
      state,
      action: PayloadAction<{
        index: number;
        yPosition: number;
      }>,
    ) => {
      state.dayItemsYPosition[action.payload.index] = action.payload.yPosition;
    },
    resetState: () => initialState,
  },
});

/**
 * Action exports
 */
export const { setDayItemsYPosition, resetState } = workoutsSlice.actions;

/**
 * Selectors
 */
export const selectDayItemsYPosition = (state: RootState) =>
  state.workouts.dayItemsYPosition;

/**
 * Reducer export
 */
export default workoutsSlice.reducer;
