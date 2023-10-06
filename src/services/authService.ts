import { LoginBody, RegisterBody } from "../types/auth";
import { User } from "../types/user";

export const login = async (
  body: LoginBody,
): Promise<{
  user: User;
  token: string;
}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user: User = {
        email: "email@email.com",
        firstName: "John",
        lastName: "Doe",
        isPremium: true,
        username: "johndoe",
      };

      resolve({
        user,
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      });
    }, 400);
  });
};

export const register = async (body: RegisterBody) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};

export const logout = async (): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 400);
  });
};

// make token parameter required after the real backend connection
export const getUser = async (token?: string): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        email: "email@email.com",
        firstName: "John",
        lastName: "Doe",
        isPremium: true,
        username: "johndoe",
      });
    }, 600);
  });
};
