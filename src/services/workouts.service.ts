import { ApiError } from "../types/general.type";
import { UpdateGoalRequest } from "../types/goals.type";
import { ProgramCategory } from "../types/workouts.type";
import { decodeAccessToken } from "../utils/auth";
import { API_URL } from "../utils/config";

export const getAllProgramCategory = async (token: string) => {
  const url = `${API_URL}/ProgramCategory/GetAll`;

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
        "Unknown error when fetching program categories.",
    );
  }

  return data as ProgramCategory[];
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
