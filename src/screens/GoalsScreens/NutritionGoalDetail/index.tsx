import { useHeaderHeight } from "@react-navigation/elements";
import moment from "moment";
import { useState } from "react";
import { Text, View } from "react-native";

import DaySelector from "../../../components/DaySelector";
import FocusAwareStatusBar from "../../../components/FocusAwareStatusBar";
import NutritionGoalsSection from "../../../components/NutritionGoalsSection";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { selectGoals } from "../../../slices/goalsSlice";
import { colors, spacing } from "../../../theme";
import { GoalsResponse } from "../../../types/goals.type";
import { NutritionGoalData } from "../../../types/nutrition.type";
import { generateNutritionGoalData } from "../../../utils/nutrition";

const NutritionGoalDetail = () => {
  const headerHeight = useHeaderHeight();

  const goals = useAppSelector(selectGoals);

  const { nutrition } = goals as GoalsResponse;

  const todayIndex = (moment().day() + 6) % 7;

  // moment starts from sunday, our index starts from 0
  const [selectedDayIndex, setSelectedDayIndex] = useState(todayIndex);

  const percentageOfCalorieOfWeek =
    (nutrition.tkcal[todayIndex] / nutrition.totalCal) * 100;

  const nutritionGoalData: NutritionGoalData = generateNutritionGoalData({
    calorieGoal: nutrition.totalCal,
    currentCalorie: nutrition.tkcal[todayIndex],
    carbGoal: nutrition.totalCarbonhydrate,
    currentCarb: nutrition.carbonhydrate[todayIndex],
    fatGoal: nutrition.totalFat,
    currentFat: nutrition.fat[todayIndex],
    proteinGoal: nutrition.totalProtein,
    currentProtein: nutrition.protein[todayIndex],
    fibreGoal: nutrition.totalFibre,
    currentFibre: nutrition.fibre[todayIndex],
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.secondary,
      }}
    >
      <FocusAwareStatusBar style="light" animated />
      <View
        style={{
          backgroundColor: colors.secondary,
          flex: 0.2,
          paddingTop: headerHeight,
          justifyContent: "center",
        }}
      >
        <DaySelector
          selectedDayIndex={selectedDayIndex}
          changeSelectedDayIndex={setSelectedDayIndex}
        />
      </View>

      <View
        style={{
          backgroundColor: "#F9F9FA",
          flex: 0.8,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingVertical: spacing.large,
        }}
      >
        <View
          style={{
            paddingHorizontal: spacing.medium,
            flex: 1,
            gap: spacing.huge,
            paddingBottom: spacing.medium,
          }}
        >
          <View
            style={{
              flex: 1,
              gap: spacing.huge,
            }}
          >
            <NutritionGoalsSection data={nutritionGoalData} />

            <View
              style={{
                alignItems: "center",
                gap: spacing.medium,
              }}
            >
              <Text style={{ textAlign: "center", width: "70%" }}>
                Your average calorie compliance percentage in this day is:
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                %{percentageOfCalorieOfWeek}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NutritionGoalDetail;
