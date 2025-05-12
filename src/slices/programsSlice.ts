import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getAllProgramCategory } from "../services/workouts.service";
import { ProgramCategory } from "../types/workouts.type";
import { RootState } from "../utils/store";

export interface ProgramsState {
  programCategories: ProgramCategory[];
}

const initialState: ProgramsState = {
  programCategories: [],
};

export const getAllProgramCategoryAction = createAsyncThunk(
  "programs/getAllProgramCategoryAction",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    const { accessToken } = state.auth;

    if (accessToken) {
      const programCategories = await getAllProgramCategory(accessToken);

      return programCategories;
    }
  },
);

export const programsSlice = createSlice({
  name: "programs",
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProgramCategoryAction.fulfilled, (state, action) => {
      const programCategories = action.payload;
      if (programCategories) {
        state.programCategories = programCategories;
      }
    });
  },
});

/**
 * Action exports
 */
export const { resetState } = programsSlice.actions;

/**
 * Selectors
 */

export const selectProgramCategories = (state: RootState) =>
  state.programs.programCategories;

/**
 * Reducer export
 */
export default programsSlice.reducer;
