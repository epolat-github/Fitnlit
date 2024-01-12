import Feather from "@expo/vector-icons/Feather";
import { RouteProp } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { Platform, Pressable } from "react-native";

import ExerciseDetails from "../screens/WorkoutsScreens/ExerciseDetails";
import ExerciseList from "../screens/WorkoutsScreens/ExerciseList";
import WorkoutDayDetails from "../screens/WorkoutsScreens/WorkoutDayDetails";
import WorkoutHelper from "../screens/WorkoutsScreens/WorkoutHelper";
import Workouts from "../screens/WorkoutsScreens/Workouts";
import { Exercise } from "../types/exercise.type";

export type WorkoutsStackParamList = {
  Workouts: undefined;
  WorkoutHelper: undefined;
  ExerciseDetails: {
    exercise: Exercise;
  };
  WorkoutDayDetails: {
    dayName: string;
    dayDetails: Exercise[];
  };
  ExerciseList: undefined;
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
      <WorkoutsStack.Screen
        name="ExerciseList"
        component={ExerciseList}
        options={{
          presentation: "modal",
          title: "Exercise List",
          headerBackTitleVisible: false,
          headerBlurEffect: "light",
          headerTransparent: Platform.OS !== "android",
        }}
      />
      <WorkoutsStack.Screen
        name="WorkoutHelper"
        component={WorkoutHelper}
        options={({ navigation }) => ({
          presentation: "fullScreenModal",
          headerShown: false,
          headerRight: () => (
            <Pressable onPress={navigation.goBack}>
              <Feather name="x" color="#000" size={22} />
            </Pressable>
          ),
        })}
      />
    </WorkoutsStack.Navigator>
  );
};

export default WorkoutsStackNavigator;
