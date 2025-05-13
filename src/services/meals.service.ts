import { ApiError } from "../types/general.type";
import { GoalsResponse, UpdateGoalRequest } from "../types/goals.type";
import { MealOld, MealCategory, MealListItem, Meal } from "../types/meals.type";
import { decodeAccessToken } from "../utils/auth";
import { API_URL } from "../utils/config";

export const getMealCategories = async (token: string) => {
  const url = `${API_URL}/MealCategory/GetAll`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      (data as ApiError).message ||
        "Unknown error when fetching meal categories.",
    );
  }

  return data as MealCategory[];
};

export const getMealsByCategory = async (token: string, categoryId: number) => {
  const url = `${API_URL}/Meal/GetMealsByCategoryId?Id=${categoryId}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      (data as ApiError).message ||
        "Unknown error when fetching meals by category.",
    );
  }

  return data as MealListItem[];
};

export const getMealById = async (token: string, mealId: number) => {
  const url = `${API_URL}/Meal/FindMealById?Id=${mealId}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      (data as ApiError).message || "Unknown error when fetching meal by id.",
    );
  }

  return data as Meal;
};

export const updateGoal = async (
  body: Omit<UpdateGoalRequest, "userId">,
  token: string,
) => {
  const { id } = decodeAccessToken(token);

  const url = `${API_URL}/UserGoalRel/Upsert`;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      ...body,
      userId: id,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      (data as ApiError).message || "Unknown error when updating a goal.",
    );
  }

  return data;
};
