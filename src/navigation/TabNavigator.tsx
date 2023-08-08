import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeStackNavigator from "./HomeStackNavigator";
import WorkoutsStackNavigator from "./WorkoutsStackNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
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
    </Tab.Navigator>
  );
};

export default TabNavigator;
