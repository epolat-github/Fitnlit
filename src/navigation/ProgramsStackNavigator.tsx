import Feather from "@expo/vector-icons/Feather";
import { RouteProp } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { Platform, Pressable } from "react-native";

import ProgramCategories from "../screens/ProgramsScreens/ProgramCategories";
import ProgramDetails from "../screens/ProgramsScreens/ProgramDetails";
import ProgramList from "../screens/ProgramsScreens/ProgramList";
import { colors } from "../theme";

export type ProgramsStackParamList = {
  ProgramCategories: undefined;
  ProgramList: {
    categoryId: number;
  };
  ProgramDetails: {
    programId: number;
  };
};

export type ProgramsStackNavigationType<
  T extends keyof ProgramsStackParamList,
> = NativeStackNavigationProp<ProgramsStackParamList, T>;

export type ProgramsStackNavigationRouteProp<
  T extends keyof ProgramsStackParamList,
> = RouteProp<ProgramsStackParamList, T>;

const ProgramsStack = createNativeStackNavigator<ProgramsStackParamList>();

const ProgramsStackNavigator = () => {
  return (
    <ProgramsStack.Navigator
      initialRouteName="ProgramCategories"
      screenOptions={({ navigation }) => ({
        contentStyle: {
          backgroundColor: "#fff",
        },
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerTintColor: colors.primary,
        headerTitleStyle: {
          color: "#000",
        },
        headerRight: ({ tintColor }) => (
          <Pressable onPress={navigation.getParent()?.goBack}>
            <Feather name="x" size={26} color={tintColor || "#000"} />
          </Pressable>
        ),
      })}
    >
      <ProgramsStack.Screen
        name="ProgramCategories"
        component={ProgramCategories}
        options={{
          headerBlurEffect: "extraLight",
          headerTransparent: Platform.OS !== "android",
          title: "Program Kategorilerimiz",
        }}
      />
      <ProgramsStack.Screen
        name="ProgramList"
        component={ProgramList}
        options={{
          headerBlurEffect: "extraLight",
          headerTransparent: Platform.OS !== "android",
          title: "Programlarımız",
        }}
      />
      <ProgramsStack.Screen
        name="ProgramDetails"
        component={ProgramDetails}
        options={{
          headerBlurEffect: "extraLight",
          headerTransparent: Platform.OS !== "android",
          title: "",
          headerShown: false,
        }}
      />
    </ProgramsStack.Navigator>
  );
};

export default ProgramsStackNavigator;
