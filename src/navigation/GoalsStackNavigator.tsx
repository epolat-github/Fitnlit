import { RouteProp } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import Goals from "../screens/GoalsScreens/Goals";
import WaterGoalDetail from "../screens/GoalsScreens/WaterGoalDetail";

export type GoalsStackParamList = {
  Goals: undefined;
  WaterGoalDetail: undefined;
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
        screenOptions={{
          presentation: "modal",
          headerTransparent: true,
          headerTintColor: "#fff",
        }}
      >
        <GoalsStack.Screen
          name="WaterGoalDetail"
          component={WaterGoalDetail}
          options={{
            title: "Water Goal",
          }}
        />
      </GoalsStack.Group>
    </GoalsStack.Navigator>
  );
};

export default GoalsStackNavigator;
