import { LoginBody } from "../types/auth";
import { User } from "../types/user";

export const login = async (body: LoginBody): Promise<User> => {
  return {
    email: "email@email.com",
    firstName: "Name",
    lastName: "Surname",
    isPremium: true,
    username: "username",
  };
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       const user: User = {
  //         email: "email@email.com",
  //         firstName: "Name",
  //         lastName: "Surname",
  //         isPremium: true,
  //         username: "username",
  //       };

  //       resolve(user);
  //     }, 2000);
  //   });
};

export const logout = async (): Promise<boolean> => {
    return true
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(true);
//     }, 2000);
//   });
};
