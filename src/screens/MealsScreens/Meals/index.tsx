import { useHeaderHeight } from "@react-navigation/elements";
import moment from "moment";
import { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";

import DaySelector from "../../../components/DaySelector";
import FocusAwareStatusBar from "../../../components/FocusAwareStatusBar";
import MealItem from "../../../components/Meals/MealItem";
import NutritionGoalsSection from "../../../components/NutritionGoalsSection";
import { NUTRITION_GOALS_DATA, WEEKLY_MEALS } from "../../../mockupData";
import { colors, spacing } from "../../../theme";

const Meals = () => {
  const headerHeight = useHeaderHeight();

  // moment starts from sunday
  const [selectedDayIndex, setSelectedDayIndex] = useState(
    (moment().day() + 6) % 7,
  );

  const mealListofSelectedDay = WEEKLY_MEALS[selectedDayIndex];

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

      <ScrollView
        // ref={scrollViewRef}
        style={{
          backgroundColor: "#F9F9FA",
          flex: 0.8,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
        contentContainerStyle={{
          paddingBottom: spacing.large,
          gap: spacing.large,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingHorizontal: spacing.medium,
            paddingVertical: spacing.large,
            backgroundColor: "#fff",
          }}
        >
          <NutritionGoalsSection data={NUTRITION_GOALS_DATA} />
        </View>

        <View style={{ gap: spacing.large, paddingHorizontal: spacing.medium }}>
          {mealListofSelectedDay.map((meal, index) => (
            <MealItem
              // TODO change key to meal id
              key={`meal-${index}-${selectedDayIndex}`}
              meal={meal}
              index={index}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Meals;
