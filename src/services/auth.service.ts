import {
  CheckForgotPasswordKeyBody,
  GenerateForgotPasswordKeyBody,
  LoginBody,
  LoginResponse,
  LogoutBody,
  RegisterBody,
  ResetPasswordByEmailBody,
} from "../types/auth.type";
import { User } from "../types/user.type";
import { API_URL } from "../utils/config";

export const login = async (body: LoginBody) => {
  const url = `${API_URL}/AuthMobile/LoginMobile`;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return Promise.reject({
      message: "Login error",
    });
  }

  const data = await response.json();

  return data as LoginResponse;
};

export const register = async (body: RegisterBody) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};

export const logout = async (body: LogoutBody, token: string) => {
  const url = `${API_URL}/AuthMobile/LogoutMobile`;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return Promise.reject({
      message: "Logout error",
    });
  }

  const data = await response.json();

  return data;
};

export const generateForgotPasswordKey = async (
  body: GenerateForgotPasswordKeyBody,
) => {
  const url = `${API_URL}/AuthMobile/GenerateForgotPasswordKey`;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return Promise.reject({
      message: "Generate forgot password key error",
    });
  }

  const data = await response.json();

  return data;
};

export const checkForgotPasswordKey = async (
  body: CheckForgotPasswordKeyBody,
) => {
  const url = `${API_URL}/AuthMobile/CheckForgotPasswordKey`;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return Promise.reject({
      message: "Check forgot password key error",
    });
  }

  const data = await response.json();

  return data;
};

export const resetPasswordByEmail = async (body: ResetPasswordByEmailBody) => {
  const url = `${API_URL}/AuthMobile/ResetPasswordByEmail`;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return Promise.reject({
      message: "Reset password by email error",
    });
  }

  const data = await response.json();

  return data;
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
