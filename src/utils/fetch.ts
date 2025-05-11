export const parseSafeJSON = async <T = any>(
  response: Response,
): Promise<T | null> => {
  const contentType = response.headers.get("Content-Type");

  if (contentType?.includes("application/json")) {
    try {
      return await response.json();
    } catch (error) {
      console.warn("JSON parse error:", error);
      return null;
    }
  }

  console.warn("Non-JSON response received.");
  return null;
};
