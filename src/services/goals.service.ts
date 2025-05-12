import { ApiError } from "../types/general.type";
import { GoalsResponse, UpdateGoalRequest } from "../types/goals.type";
import { decodeAccessToken } from "../utils/auth";
import { API_URL } from "../utils/config";

export const getGoals = async (token: string) => {
  const { id } = decodeAccessToken(token);

  const url = `${API_URL}/UserGoalRel/WeeklyUserGoal?UserId=${id}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      (data as ApiError).message || "Unknown error when fetching goals.",
    );
  }

  return data as GoalsResponse;
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
