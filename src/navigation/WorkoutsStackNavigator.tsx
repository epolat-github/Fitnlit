import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Workouts from "../screens/WorkoutsScreens/Workouts";

const WorkoutsStack = createNativeStackNavigator();

const WorkoutsStackNavigator = () => {
  return (
    <WorkoutsStack.Navigator
      initialRouteName="Workouts"
      screenOptions={{
        contentStyle: {
          backgroundColor: "#fff",
        },
        headerShadowVisible: false,
      }}
    >
      <WorkoutsStack.Screen name="Workouts" component={Workouts} />
    </WorkoutsStack.Navigator>
  );
};

export default WorkoutsStackNavigator;
