import { RouteProp } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { Platform } from "react-native";

import MealDetails from "../screens/MealsScreens/MealDetails";
import Meals from "../screens/MealsScreens/Meals";
import { Meal } from "../types/meals.type";

export type MealsStackParamList = {
  Meals: undefined;
  MealDetails: {
    meal: Meal;
  };
};

export type MealsStackNavigationType<T extends keyof MealsStackParamList> =
  NativeStackNavigationProp<MealsStackParamList, T>;

export type MealsStackNavigationRouteProp<T extends keyof MealsStackParamList> =
  RouteProp<MealsStackParamList, T>;

const MealsStack = createNativeStackNavigator<MealsStackParamList>();

const MealsStackNavigator = () => {
  return (
    <MealsStack.Navigator
      initialRouteName="Meals"
      screenOptions={{
        contentStyle: {
          backgroundColor: "#fff",
        },
        headerShadowVisible: false,
      }}
    >
      <MealsStack.Screen
        name="Meals"
        component={Meals}
        options={{
          headerTransparent: true,
          headerTintColor: "#fff",
        }}
      />
      <MealsStack.Screen
        name="MealDetails"
        component={MealDetails}
        options={{
          presentation: "modal",
          title: "Meal Details",
          headerBackTitleVisible: false,
          headerBlurEffect: "light",
          headerTransparent: Platform.OS !== "android",
        }}
      />
    </MealsStack.Navigator>
  );
};

export default MealsStackNavigator;
