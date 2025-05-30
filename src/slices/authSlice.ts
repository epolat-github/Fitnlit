import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getUser, login, logout, register } from "../services/auth.service";
import { LoginBody, RegisterBody } from "../types/auth.type";
import { User } from "../types/user.type";
// import { removeItem, setItem } from "../utils/localStorage";
import { RootState } from "../utils/store";

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean | null;
  token?: string;
  errors: {
    loginError: string;
  };
  // tokens: Tokens | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isLoggedIn: null,
  token: undefined,
  errors: {
    loginError: "",
  },
  // tokens: null
};

// TODO handle unauth login
export const loginAction = createAsyncThunk(
  "auth/loginAction",
  async (body: LoginBody, thunkAPI) => {
    const response = await login(body);

    const {
      mobileUserDTO: {
        token: { acessToken },
      },
    } = response;

    thunkAPI.dispatch(getUserAction());

    // AsyncStorage.setItem("user", JSON.stringify(user));
    AsyncStorage.setItem("token", acessToken);

    return response;
  },
);

export const registerAction = createAsyncThunk(
  "auth/registerAction",
  async (body: RegisterBody, thunkAPI) => {
    const response = await register(body);

    return response;
  },
);

export const logoutAction = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    // await logout();

    thunkAPI.dispatch(resetState());

    AsyncStorage.removeItem("user");
    AsyncStorage.removeItem("token");

    return true;
  },
);

export const getUserAction = createAsyncThunk(
  "auth/getUserAction",
  async (_, thunkAPI) => {
    const user = await getUser();

    return user;
  },
);

export const restoreUserAction = createAsyncThunk(
  "auth/restoreUserAction",
  async (_, thunkAPI) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      const user = await getUser(token);

      return user;
    }
  },
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    resetLoginError: (state) => {
      state.errors.loginError = "";
    },
    resetState: () => initialState,
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.fulfilled, (state, action) => {
        const { token, user } = action.payload;
        state.user = user;
        state.token = token;
      })
      .addCase(loginAction.rejected, (state, action) => {
        const error = action.error;
        console.log("Login error: ", error);

        const { message } = error;

        state.errors.loginError = message ?? "Unknown error";
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        state.user = null;
      })
      .addCase(getUserAction.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(restoreUserAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
        }
      });
  },
});

/**
 * Action exports
 */
export const { setUser, resetLoginError, resetState, setIsLoggedIn } =
  authSlice.actions;

/**
 * Selectors
 */
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectLoginError = (state: RootState) =>
  state.auth.errors.loginError;
// export const selectTokens = (state: RootState) => state.auth.tokens;

/**
 * Reducer export
 */
export default authSlice.reducer;
