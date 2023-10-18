import { useHeaderHeight } from "@react-navigation/elements";
import moment from "moment";
import { useState } from "react";
import { Text, View } from "react-native";

import DaySelector from "../../../components/DaySelector";
import FocusAwareStatusBar from "../../../components/FocusAwareStatusBar";
import NutritionGoalsSection from "../../../components/NutritionGoalsSection";
import { NUTRITION_GOALS_DATA } from "../../../mockupData";
import { colors, spacing } from "../../../theme";

const NutritionGoalDetail = () => {
  const headerHeight = useHeaderHeight();

  // moment starts from sunday
  const [selectedDayIndex, setSelectedDayIndex] = useState(
    (moment().day() + 6) % 7,
  );

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
            <NutritionGoalsSection data={NUTRITION_GOALS_DATA} />

            <View
              style={{
                alignItems: "center",
                gap: spacing.medium,
              }}
            >
              <Text style={{ textAlign: "center", width: "70%" }}>
                Your average calorie compliance percentage in this week is:
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                30%
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NutritionGoalDetail;
