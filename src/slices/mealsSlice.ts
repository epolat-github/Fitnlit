import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getMealCategories } from "../services/meals.service";
import { MealCategory } from "../types/meals.type";
import { RootState } from "../utils/store";

export interface MealsState {
  mealCategories: MealCategory[];
}

const initialState: MealsState = {
  mealCategories: [],
};

export const getMealCategoriesAction = createAsyncThunk(
  "meals/getMealCategoriesAction",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    const { accessToken } = state.auth;

    if (accessToken) {
      const mealCategories = await getMealCategories(accessToken);

      return mealCategories;
    }
  },
);

export const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getMealCategoriesAction.fulfilled, (state, action) => {
      const mealCategories = action.payload;
      if (mealCategories) {
        state.mealCategories = mealCategories;
      }
    });
  },
});

/**
 * Action exports
 */
export const { resetState } = mealsSlice.actions;

/**
 * Selectors
 */

export const selectMealCategories = (state: RootState) =>
  state.meals.mealCategories;

/**
 * Reducer export
 */
export default mealsSlice.reducer;
