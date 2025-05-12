import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getGoals, updateGoal } from "../services/goals.service";
import { GoalsResponse, UpdateGoalRequest } from "../types/goals.type";
import { RootState } from "../utils/store";

export interface GoalsState {
  goals: GoalsResponse | null;
}

const initialState: GoalsState = {
  goals: null,
};

export const getGoalsAction = createAsyncThunk(
  "auth/getGoalsAction",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    const { accessToken } = state.auth;

    if (accessToken) {
      const goals = await getGoals(accessToken);

      return goals;
    }
  },
);

export const updateGoalsAction = createAsyncThunk(
  "auth/updateGoalsAction",
  async (body: Omit<UpdateGoalRequest, "userId">, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    const { accessToken } = state.auth;

    if (accessToken) {
      await updateGoal(body, accessToken);
      await thunkAPI.dispatch(getGoalsAction()).unwrap();
    }
  },
);

export const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getGoalsAction.fulfilled, (state, action) => {
      const goals = action.payload;
      if (goals) {
        state.goals = goals;
      }
    });
  },
});

/**
 * Action exports
 */
export const { resetState } = goalsSlice.actions;

/**
 * Selectors
 */
export const selectGoals = (state: RootState) => state.goals.goals;

/**
 * Reducer export
 */
export default goalsSlice.reducer;
