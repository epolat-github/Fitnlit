import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import GoalsStackNavigator from "./GoalsStackNavigator";
import HomeStackNavigator from "./HomeStackNavigator";
import MealsStackNavigator from "./MealsStackNavigator";
import TrackingStackNavigator from "./TrackingStackNavigator";
import WorkoutsStackNavigator from "./WorkoutsStackNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="WorkoutsStack"
        component={WorkoutsStackNavigator}
        options={{ title: "Workouts" }}
      />
      <Tab.Screen
        name="MealsStack"
        component={MealsStackNavigator}
        options={{ title: "Meals" }}
      />
      <Tab.Screen
        name="TrackingStack"
        component={TrackingStackNavigator}
        options={{ title: "Tracking" }}
      />
      <Tab.Screen
        name="GoalsStack"
        component={GoalsStackNavigator}
        options={{ title: "Goals" }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
