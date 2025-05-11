import {
  CheckForgotPasswordKeyBody,
  GenerateForgotPasswordKeyBody,
  LoginBody,
  LoginResponse,
  LogoutBody,
  RegisterBody,
  ResetPasswordByEmailBody,
  UpdateProfileRequest,
} from "../types/auth.type";
import { ApiError } from "../types/general.type";
import { Profile } from "../types/user.type";
import { decodeAccessToken } from "../utils/auth";
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

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      (data as ApiError).message || "Unknown error when logging in.",
    );
  }

  return data as LoginResponse;
};

export const register = async (body: RegisterBody) => {
  const url = `${API_URL}/AuthMobile/RegisterMobile`;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      (data as ApiError).message || "Unknown error when registering.",
    );
  }

  return data;
};

export const logout = async (token: string, pushNotificationToken?: string) => {
  const url = `${API_URL}/AuthMobile/LogoutMobile`;

  const { id } = decodeAccessToken(token);

  const body: LogoutBody = {
    phoneNotifToken: pushNotificationToken,
    userId: id,
  };

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      (data as ApiError).message || "Unknown error when logging out.",
    );
  }

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

export const getProfile = async (token: string) => {
  const { id } = decodeAccessToken(token);

  const url = `${API_URL}/AuthMobile/GetProfileDetails?UserId=${id}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      (data as ApiError).message || "Unknown error when fetching profile.",
    );
  }

  return data as Profile;
};

export const updateProfile = async (
  body: UpdateProfileRequest,
  token: string,
) => {
  const url = `${API_URL}/AuthMobile/UpdateProfileDetails`;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      (data as ApiError).message || "Unknown error when updating profile.",
    );
  }

  return data as Profile;
};
