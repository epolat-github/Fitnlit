import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeStackNavigator from "./HomeStackNavigator";

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
    </Tab.Navigator>
  );
};

export default TabNavigator;
