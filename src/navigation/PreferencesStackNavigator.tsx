import { RouteProp } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import PreferencesModal from "../screens/PreferencesScreens/PreferencesModal";

export type PreferencesStackParamList = {
  PreferencesModal: undefined;
};

export type PreferencesStackNavigationType<
  T extends keyof PreferencesStackParamList,
> = NativeStackNavigationProp<PreferencesStackParamList, T>;

export type PreferencesStackNavigationRouteProp<
  T extends keyof PreferencesStackParamList,
> = RouteProp<PreferencesStackParamList, T>;

const PreferencesStack =
  createNativeStackNavigator<PreferencesStackParamList>();

const PreferencesStackNavigator = () => {
  return (
    <PreferencesStack.Navigator
      initialRouteName="PreferencesModal"
      screenOptions={{
        contentStyle: {
          backgroundColor: "#fff",
        },
        headerShadowVisible: false,
        headerShown: false,
      }}
    >
      <PreferencesStack.Screen
        name="PreferencesModal"
        component={PreferencesModal}
      />
    </PreferencesStack.Navigator>
  );
};

export default PreferencesStackNavigator;
