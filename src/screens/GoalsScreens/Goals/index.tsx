import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, ScrollView, Text, View } from "react-native";
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import FocusAwareStatusBar from "../../../components/FocusAwareStatusBar";
import GoalItem from "../../../components/GoalItem";
import { GoalsStackNavigationType } from "../../../navigation/GoalsStackNavigator";
import { spacing } from "../../../theme";

const { width } = Dimensions.get("window");

const Goals = () => {
  const navigation = useNavigation<GoalsStackNavigationType<"Goals">>();
  const headerHeight = useHeaderHeight();

  const translationX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationX.value = event.contentOffset.x;
  });

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: spacing.medium,
        // backgroundColor: colors.secondary,
      }}
    >
      <FocusAwareStatusBar style="dark" animated />

      <Text
        style={{
          color: "gray",
          paddingVertical: spacing.medium,
        }}
      >
        Here is your goals. You can track what you have accomplished!
      </Text>

      <ScrollView
        style={{
          flex: 1,
          flexDirection: "column",
        }}
        contentContainerStyle={{
          justifyContent: "center",
          gap: spacing.medium,
          paddingVertical: spacing.medium,
        }}
        showsVerticalScrollIndicator={false}
      >
        <GoalItem
          index={0}
          title="Water"
          image={require("../../../../assets/images/shared/water-with-lemon.png")}
          onPress={() => navigation.navigate("WaterGoalDetail")}
        />
        <GoalItem
          index={1}
          title="Steps"
          image={require("../../../../assets/images/shared/step-count.png")}
          onPress={() => navigation.navigate("StepGoalDetail")}
        />
        <GoalItem
          index={2}
          title="Sleep"
          image={require("../../../../assets/images/shared/bed.png")}
        />
        <GoalItem
          index={3}
          title="Nutrition"
          image={require("../../../../assets/images/shared/bed.png")}
          onPress={() => navigation.navigate("NutritionGoalDetail")}
        />
        <GoalItem
          index={4}
          title="Daily Goals"
          image={require("../../../../assets/images/shared/bed.png")}
        />
      </ScrollView>
    </View>
  );
};

export default Goals;
