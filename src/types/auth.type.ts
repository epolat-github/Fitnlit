import { User } from "./user.type";

export interface LoginBody {
  phoneNotifToken?: string;
  userNameOrEmail: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface RegisterBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LogoutBody {
  phoneNotifToken?: string;
  userId?: string;
}

export interface GenerateForgotPasswordKeyBody {
  email: string;
}

export interface CheckForgotPasswordKeyBody {
  email: string;
  key: string;
}

export interface ResetPasswordByEmailBody {
  email: string;
  password: string;
  passwordConfirm: string;
}
