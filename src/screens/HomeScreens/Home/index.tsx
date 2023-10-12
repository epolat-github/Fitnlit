import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";

import FocusAwareStatusBar from "../../../components/FocusAwareStatusBar";
import ActiveWorkoutCard from "../../../components/Home/ActiveWorkoutCard";
import GoalTrackingSection from "../../../components/Home/GoalTrackingSection";
import NumberOverviewSection from "../../../components/Home/NumberOverviewSection";
import NutritionGoalsSection from "../../../components/NutritionGoalsSection";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { NUTRITION_GOALS_DATA } from "../../../mockupData";
import { HomeStackNavigationType } from "../../../navigation/HomeStackNavigator";
import { selectUser } from "../../../slices/authSlice";
import { spacing } from "../../../theme";

const Home = () => {
  const user = useAppSelector(selectUser);
  const navigation = useNavigation<HomeStackNavigationType<"Home">>();

  useEffect(() => {
    if (!user) return;

    const { firstName } = user;

    navigation.setOptions({ title: `Hello, ${firstName}` });
  }, [navigation, user]);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: spacing.medium,
      }}
    >
      <FocusAwareStatusBar style="dark" />
      <NumberOverviewSection />
      <ActiveWorkoutCard />

      {/* Nutrition Goals Section */}
      <View
        style={{
          marginVertical: spacing.large,
          gap: spacing.large,
        }}
      >
        <Text
          style={{
            color: "#2E3342",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Nutrition Goals
        </Text>

        <NutritionGoalsSection data={NUTRITION_GOALS_DATA} />
      </View>

      <View
        style={{
          gap: spacing.large,
        }}
      >
        <Text
          style={{
            color: "#2E3342",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Goal Tracking
        </Text>
        <GoalTrackingSection />
      </View>
    </ScrollView>
  );
};

export default Home;
