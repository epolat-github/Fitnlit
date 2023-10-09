import { RouteProp } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { Platform } from "react-native";

import ExerciseDetails from "../screens/WorkoutsScreens/ExerciseDetails";
import WorkoutDayDetails from "../screens/WorkoutsScreens/WorkoutDayDetails";
import Workouts from "../screens/WorkoutsScreens/Workouts";
import { Exercise } from "../types/exercise.type";

export type WorkoutsStackParamList = {
  Workouts: undefined;
  ExerciseDetails: {
    exercise: Exercise;
  };
  WorkoutDayDetails: {
    dayName: string;
    dayDetails: Exercise[];
  };
};

export type WorkoutsStackNavigationType<
  T extends keyof WorkoutsStackParamList,
> = NativeStackNavigationProp<WorkoutsStackParamList, T>;

export type WorkoutsStackNavigationRouteProp<
  T extends keyof WorkoutsStackParamList,
> = RouteProp<WorkoutsStackParamList, T>;

const WorkoutsStack = createNativeStackNavigator<WorkoutsStackParamList>();

const WorkoutsStackNavigator = () => {
  return (
    <WorkoutsStack.Navigator
      initialRouteName="Workouts"
      screenOptions={{
        contentStyle: {
          backgroundColor: "#fff",
        },
        headerShadowVisible: false,
        // headerTransparent: true,
      }}
    >
      <WorkoutsStack.Screen
        name="Workouts"
        component={Workouts}
        options={{
          headerTransparent: true,
          headerTintColor: "#fff",
        }}
      />
      <WorkoutsStack.Screen
        name="ExerciseDetails"
        component={ExerciseDetails}
        options={{
          animation: "fade",
          title: "Exercise Details",
          headerBackTitleVisible: false,
          headerBlurEffect: "light",
          headerTransparent: Platform.OS !== "android",
        }}
      />
      <WorkoutsStack.Screen
        name="WorkoutDayDetails"
        component={WorkoutDayDetails}
        options={{
          animation: "fade",
          title: "",
          headerBackTitleVisible: false,
          headerBlurEffect: "light",
          headerTransparent: Platform.OS !== "android",
        }}
      />
    </WorkoutsStack.Navigator>
  );
};

export default WorkoutsStackNavigator;
