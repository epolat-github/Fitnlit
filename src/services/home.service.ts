import { API_URL } from "../utils/config";

export const getHomeData = async (userId: string, token: string) => {
  const url = `${API_URL}/Home?UserId=${encodeURIComponent(userId)}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return Promise.reject({
      message: "Get home data error",
    });
  }

  const data = await response.json();

  return data;
};
