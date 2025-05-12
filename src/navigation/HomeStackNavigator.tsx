import { RouteProp } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import PreferencesStackNavigator from "./PreferencesStackNavigator";
import ProgramsStackNavigator from "./ProgramsStackNavigator";
import HomeHeader from "../components/HomeHeader";
import Home from "../screens/HomeScreens/Home";

export type HomeStackParamList = {
  Home: undefined;
  PreferencesStack: undefined;
  ProgramsStack: undefined;
};

export type HomeStackNavigationType<T extends keyof HomeStackParamList> =
  NativeStackNavigationProp<HomeStackParamList, T>;

export type HomeStackNavigationRouteProp<T extends keyof HomeStackParamList> =
  RouteProp<HomeStackParamList, T>;

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        contentStyle: {
          backgroundColor: "#fff",
        },
        headerShadowVisible: false,
        header: (props) => <HomeHeader {...props} />,
      }}
    >
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen
        name="PreferencesStack"
        component={PreferencesStackNavigator}
        options={{
          headerShown: false,
          presentation: "fullScreenModal",
        }}
      />
      <HomeStack.Screen
        name="ProgramsStack"
        component={ProgramsStackNavigator}
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
