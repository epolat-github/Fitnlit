import { RouteProp } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import Trackings from "../screens/TrackingScreens/Trackings";

export type TrackingStackParamList = {
  Trackings: undefined;
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
        // header: (props) => <HomeHeader {...props} />,
      }}
    >
      <TrackingStack.Screen name="Trackings" component={Trackings} />
    </TrackingStack.Navigator>
  );
};

export default TrackingStackNavigator;
