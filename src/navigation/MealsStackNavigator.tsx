import { RouteProp } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import Meals from "../screens/MealsScreens/Meals";

export type MealsStackParamList = {
  Meals: undefined;
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
    </MealsStack.Navigator>
  );
};

export default MealsStackNavigator;
