import { RouteProp } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import React from "react";

/**
 * Screen Imports
 */
import ForgotPassword from "../screens/AuthScreens/ForgotPassword";
import Login from "../screens/AuthScreens/Login";
import Onboarding from "../screens/AuthScreens/Onboarding";
import Register from "../screens/AuthScreens/Register";
import SetupPassword from "../screens/AuthScreens/SetupPassword";
import SuccessfulRegistration from "../screens/AuthScreens/SuccessfulRegistration";

export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  SetupPassword: {
    firstName: string;
    lastName: string;
    email: string;
  };
  SuccessfulRegistration: undefined;
};

export type AuthStackNavigationType<T extends keyof AuthStackParamList> =
  NativeStackNavigationProp<AuthStackParamList, T>;

export type AuthStackNavigationRouteProp<T extends keyof AuthStackParamList> =
  RouteProp<AuthStackParamList, T>;

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        // headerShown: false,
        animation: "fade",
        customAnimationOnGesture: true,
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: "#fff",
        },
      }}
    >
      <AuthStack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{
          title: "",
        }}
      />
      <AuthStack.Screen
        name="Register"
        component={Register}
        options={{
          title: "",
        }}
      />
      <AuthStack.Screen
        name="SetupPassword"
        component={SetupPassword}
        options={{
          title: "",
        }}
      />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          title: "",
        }}
      />
      <AuthStack.Screen
        name="SuccessfulRegistration"
        component={SuccessfulRegistration}
        options={{
          title: "",
          headerShown: false,
          animation: "fade",
          presentation: "card",
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
