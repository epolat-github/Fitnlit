import { RouteProp } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import HomeHeader from "../components/HomeHeader";
import Home from "../screens/HomeScreens/Home";

export type GoalsStackParamList = {
  Home: undefined;
};

export type GoalsStackNavigationType<T extends keyof GoalsStackParamList> =
  NativeStackNavigationProp<GoalsStackParamList, T>;

export type GoalsStackNavigationRouteProp<T extends keyof GoalsStackParamList> =
  RouteProp<GoalsStackParamList, T>;

const GoalsStack = createNativeStackNavigator<GoalsStackParamList>();

const GoalsStackNavigator = () => {
  return (
    <GoalsStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        contentStyle: {
          backgroundColor: "#fff",
        },
        headerShadowVisible: false,
        header: (props) => <HomeHeader {...props} />,
      }}
    >
      <GoalsStack.Screen name="Home" component={Home} />
    </GoalsStack.Navigator>
  );
};

export default GoalsStackNavigator;
