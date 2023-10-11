import { RouteProp } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import HomeHeader from "../components/HomeHeader";
import Home from "../screens/HomeScreens/Home";

export type MealsStackParamList = {
  Home: undefined;
};

export type MealsStackNavigationType<T extends keyof MealsStackParamList> =
  NativeStackNavigationProp<MealsStackParamList, T>;

export type MealsStackNavigationRouteProp<T extends keyof MealsStackParamList> =
  RouteProp<MealsStackParamList, T>;

const MealsStack = createNativeStackNavigator<MealsStackParamList>();

const MealsStackNavigator = () => {
  return (
    <MealsStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        contentStyle: {
          backgroundColor: "#fff",
        },
        headerShadowVisible: false,
        header: (props) => <HomeHeader {...props} />,
      }}
    >
      <MealsStack.Screen name="Home" component={Home} />
    </MealsStack.Navigator>
  );
};

export default MealsStackNavigator;