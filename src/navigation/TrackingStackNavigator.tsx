import { RouteProp } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { Platform } from "react-native";

import EntryDetails from "../screens/TrackingScreens/EntryDetails";
import Trackings from "../screens/TrackingScreens/Trackings";

export type TrackingStackParamList = {
  Trackings: undefined;
  EntryDetails: {
    entryId: string;
  };
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
        // header: (props) => <HomeHeader {...props} />,
      }}
    >
      <TrackingStack.Screen name="Trackings" component={Trackings} />
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
