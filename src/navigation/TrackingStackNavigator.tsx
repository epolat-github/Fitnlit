import Feather from "@expo/vector-icons/Feather";
import { RouteProp } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { Platform, Pressable } from "react-native";

import EntryDetails from "../screens/TrackingScreens/EntryDetails";
import Trackings from "../screens/TrackingScreens/Trackings";
import UpdateMeasurements from "../screens/TrackingScreens/UpdateMeasurements";

export type TrackingStackParamList = {
  Trackings: undefined;
  EntryDetails: {
    entryId: string;
  };
  UpdateMeasurements: undefined;
};

export type TrackingStackNavigationType<
  T extends keyof TrackingStackParamList,
> = NativeStackNavigationProp<TrackingStackParamList, T>;

export type TrackingStackNavigationRouteProp<
  T extends keyof TrackingStackParamList,
> = RouteProp<TrackingStackParamList, T>;

const TrackingStack = createNativeStackNavigator<TrackingStackParamList>();

const TrackingStackNavigator = () => {
  return (
    <TrackingStack.Navigator
      initialRouteName="Trackings"
      screenOptions={{
        contentStyle: {
          backgroundColor: "#fff",
        },
        headerShadowVisible: false,
        headerBlurEffect: "light",
        headerTransparent: Platform.OS !== "android",
      }}
    >
      <TrackingStack.Screen name="Trackings" component={Trackings} />
      <TrackingStack.Screen
        name="UpdateMeasurements"
        component={UpdateMeasurements}
        options={({ navigation }) => ({
          headerBackTitleVisible: false,
          title: "Update Measurements",
          presentation: "modal",
          headerRight: () => (
            <Pressable onPress={navigation.goBack}>
              <Feather name="x" color="#000" size={22} />
            </Pressable>
          ),
        })}
      />
      <TrackingStack.Screen
        name="EntryDetails"
        component={EntryDetails}
        options={{
          headerBackTitleVisible: false,
          title: "",
          headerTransparent: false,
        }}
      />
    </TrackingStack.Navigator>
  );
};

export default TrackingStackNavigator;
