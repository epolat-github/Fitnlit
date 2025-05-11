export interface LoginBody {
  phoneNotifToken?: string;
  userNameOrEmail: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  mobileUserDTO: {
    token: {
      acessToken: string;
      refreshToken: string;
      expirationDate: string;
    };
    isFirstLogin: boolean;
    userGroupName: string | null;
  };
  message: string;
}

export enum GENDER {
  MALE = 1,
  FEMALE = 2,
}

export interface RegisterBody {
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  birthDate: string | null;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: GENDER;
  profilePicture: string;
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
