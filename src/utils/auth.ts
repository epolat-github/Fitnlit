import { jwtDecode } from "jwt-decode";

import { DecodedAccessToken } from "../types/auth.type";

export const decodeAccessToken = (token: string) => {
  const decoded = jwtDecode(token) as DecodedAccessToken;

  return {
    id: decoded[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ],
    firstName:
      decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
    lastName:
      decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"],
    email:
      decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      ],
    role: decoded[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ],
    expiry: decoded.exp,
  };
};
