export interface LoginBody {
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
  statusCode: number;
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

export interface DecodedAccessToken {
  aud: string;
  exp: number;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname": string;
  iss: string;
  nbf: number;
}

export interface UpdateProfileRequest {
  userId: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  profilePicture: string | null;
}
