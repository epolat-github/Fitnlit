import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import React from "react";

/**
 * Screen Imports
 */
import Login from "../screens/AuthScreens/Login";
import Onboarding from "../screens/AuthScreens/Onboarding";
import Register from "../screens/AuthScreens/Register";

export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
};

export type AuthStackNavigationType<T extends keyof AuthStackParamList> =
  NativeStackNavigationProp<AuthStackParamList, T>;

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Onboarding" component={Onboarding} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
