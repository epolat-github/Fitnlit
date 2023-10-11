import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
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
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color, size }) => {
            return <AntDesign name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="WorkoutsStack"
        component={WorkoutsStackNavigator}
        options={{
          title: "Workouts",
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <MaterialIcons name="fitness-center" size={size} color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="MealsStack"
        component={MealsStackNavigator}
        options={{
          title: "Meals",
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <MaterialCommunityIcons
                name="food-variant"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="TrackingStack"
        component={TrackingStackNavigator}
        options={{
          title: "Tracking",
          tabBarIcon: ({ focused, color, size }) => {
            return <AntDesign name="barschart" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="GoalsStack"
        component={GoalsStackNavigator}
        options={{
          title: "Goals",
          tabBarIcon: ({ focused, color, size }) => {
            return <Feather name="target" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
