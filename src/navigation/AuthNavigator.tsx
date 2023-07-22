import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

/**
 * Screen Imports
 */
import Login from "../screens/AuthScreens/Login";
import Register from "../screens/AuthScreens/Register";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  Validation: {
    email?: string;
    guid?: string;
  };
  ForgotPassword: undefined;
  ResetPassword: {
    guid: string;
  };
  Onboarding: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      {/* <AuthStack.Screen name="Onboarding" component={Login} /> */}
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
