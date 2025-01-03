import Feather from "@expo/vector-icons/Feather";
import { RouteProp } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { Pressable } from "react-native";

import Goals from "../screens/GoalsScreens/Goals";
import NutritionGoalDetail from "../screens/GoalsScreens/NutritionGoalDetail";
import SleepGoalDetail from "../screens/GoalsScreens/SleepGoalDetail";
import StepGoalDetail from "../screens/GoalsScreens/StepGoalDetail";
import WaterGoalDetail from "../screens/GoalsScreens/WaterGoalDetail";

export type GoalsStackParamList = {
  Goals: undefined;
  WaterGoalDetail: undefined;
  StepGoalDetail: undefined;
  NutritionGoalDetail: undefined;
  SleepGoalDetail: undefined;
};

export type GoalsStackNavigationType<T extends keyof GoalsStackParamList> =
  NativeStackNavigationProp<GoalsStackParamList, T>;

export type GoalsStackNavigationRouteProp<T extends keyof GoalsStackParamList> =
  RouteProp<GoalsStackParamList, T>;

const GoalsStack = createNativeStackNavigator<GoalsStackParamList>();

const GoalsStackNavigator = () => {
  return (
    <GoalsStack.Navigator
      initialRouteName="Goals"
      screenOptions={{
        contentStyle: {
          backgroundColor: "#fff",
        },
        headerShadowVisible: false,
      }}
    >
      <GoalsStack.Screen name="Goals" component={Goals} />

      <GoalsStack.Group
        screenOptions={({ navigation }) => ({
          presentation: "modal",
          headerTransparent: true,
          headerTintColor: "#fff",
          headerRight: () => (
            <Pressable onPress={navigation.goBack}>
              <Feather name="x" color="#fff" size={22} />
            </Pressable>
          ),
        })}
      >
        <GoalsStack.Screen
          name="WaterGoalDetail"
          component={WaterGoalDetail}
          options={{
            title: "Water Goal",
          }}
        />
        <GoalsStack.Screen
          name="StepGoalDetail"
          component={StepGoalDetail}
          options={{
            title: "Step Goal",
          }}
        />
        <GoalsStack.Screen
          name="NutritionGoalDetail"
          component={NutritionGoalDetail}
          options={{
            title: "Nutrition Goal",
          }}
        />
        <GoalsStack.Screen
          name="SleepGoalDetail"
          component={SleepGoalDetail}
          options={{
            title: "Sleep Goal",
          }}
        />
      </GoalsStack.Group>
    </GoalsStack.Navigator>
  );
};

export default GoalsStackNavigator;
