import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RouteProp } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { Platform, Pressable } from "react-native";

import MealDetails from "../screens/MealsScreens/MealDetails";
import Meals from "../screens/MealsScreens/Meals";
import MealCategories from "../screens/RecipesScreens/MealCategories";
import MealList from "../screens/RecipesScreens/MealList";
import { colors } from "../theme";
import { MealOld } from "../types/meals.type";

export type RecipesStackParamList = {
  MealCategories: undefined;
  MealList: {
    categoryId: number;
  };
  MealDetailsStack: {
    mealId: number;
  };
};

export type RecipesStackNavigationType<T extends keyof RecipesStackParamList> =
  NativeStackNavigationProp<RecipesStackParamList, T>;

export type RecipesStackNavigationRouteProp<
  T extends keyof RecipesStackParamList,
> = RouteProp<RecipesStackParamList, T>;

const RecipesStack = createNativeStackNavigator<RecipesStackParamList>();

const RecipesStackNavigator = () => {
  return (
    <RecipesStack.Navigator
      initialRouteName="MealCategories"
      screenOptions={({ navigation }) => ({
        contentStyle: {
          backgroundColor: "#fff",
        },
        headerShadowVisible: false,
        headerTransparent: true,
        headerTintColor: colors.primary,
        headerTitleStyle: {
          color: "#000",
        },
        headerBackTitleVisible: false,
        headerRight: ({ tintColor }) => (
          <Pressable onPress={navigation.getParent()?.goBack}>
            <Feather name="x" color={tintColor || "#000"} size={24} />
          </Pressable>
        ),
      })}
    >
      <RecipesStack.Screen
        name="MealCategories"
        component={MealCategories}
        options={{
          headerTitle: "Yemek Kategorilerimiz",
        }}
      />
      <RecipesStack.Screen
        name="MealList"
        component={MealList}
        options={{
          headerTitle: "Yemeklerimiz",
        }}
      />
      <RecipesStack.Screen
        name="MealDetailsStack"
        component={MealDetails}
        options={{
          title: "Meal Details",
          headerBackTitleVisible: false,
          headerBlurEffect: "light",
          headerTransparent: Platform.OS !== "android",
          headerShown: false,
        }}
      />
    </RecipesStack.Navigator>
  );
};

export default RecipesStackNavigator;
