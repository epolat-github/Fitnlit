import { RouteProp } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import HomeHeader from "../components/HomeHeader";
import Home from "../screens/HomeScreens/Home";

export type TrackingStackParamList = {
  Home: undefined;
};

export type TrackingStackNavigationType<T extends keyof TrackingStackParamList> =
  NativeStackNavigationProp<TrackingStackParamList, T>;

export type TrackingStackNavigationRouteProp<
  T extends keyof TrackingStackParamList,
> = RouteProp<TrackingStackParamList, T>;

const TrackingStack = createNativeStackNavigator<TrackingStackParamList>();

const TrackingStackNavigator = () => {
  return (
    <TrackingStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        contentStyle: {
          backgroundColor: "#fff",
        },
        headerShadowVisible: false,
        header: (props) => <HomeHeader {...props} />,
      }}
    >
      <TrackingStack.Screen name="Home" component={Home} />
    </TrackingStack.Navigator>
  );
};

export default TrackingStackNavigator;
