import { Entypo } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { Pressable } from "react-native";

import PreferencesStackNavigator from "./PreferencesStackNavigator";
import HomeHeader from "../components/HomeHeader";
import Home from "../screens/HomeScreens/Home";

export type HomeStackParamList = {
  Home: undefined;
  PreferencesStack: undefined;
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
        options={({
          navigation,
        }: {
          navigation: HomeStackNavigationType<"PreferencesStack">;
        }) => ({
          presentation: "fullScreenModal",
          // headerShown: false,
          title: "",
          headerTransparent: true,
          headerBlurEffect: "light",
          header: undefined,
          headerRight: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <Entypo name="cross" size={24} color="black" />
            </Pressable>
          ),
        })}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
