import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RouteProp } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { Platform, Pressable } from "react-native";

import RecipesStackNavigator from "./RecipesStackNavigator";
import MealDetails from "../screens/MealsScreens/MealDetails";
import Meals from "../screens/MealsScreens/Meals";
import { MealOld } from "../types/meals.type";

export type MealsStackParamList = {
  Meals: undefined;
  MealList: undefined;
  MealDetails: {
    mealId: number;
  };
  RecipesStackNavigator: undefined;
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
          headerRight: () => (
            <Pressable>
              <Entypo name="list" size={24} color="#fff" />
            </Pressable>
          ),
        }}
      />
      <MealsStack.Screen
        name="RecipesStackNavigator"
        component={RecipesStackNavigator}
        options={{
          presentation: "modal",
          headerShown: false,
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
          headerShown: false,
        }}
      />
    </MealsStack.Navigator>
  );
};

export default MealsStackNavigator;
