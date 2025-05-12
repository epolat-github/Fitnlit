import { Text, View, useWindowDimensions } from "react-native";

import { spacing } from "../../theme";
import { NutritionGoalData } from "../../types/nutrition.type";
import DonutChart from "../DonutChart";
import ProgressBar from "../ProgressBar";

interface NutritionGoalsSectionType {
  data: NutritionGoalData;
}

const NutritionGoalsSection: React.FC<NutritionGoalsSectionType> = ({
  data,
}) => {
  const { width } = useWindowDimensions();

  const { calorieGoal, currentCalorie, nutritionGoals } = data;

  return (
    <View
      style={{
        gap: spacing.large,
      }}
    >
      <ProgressBar
        value={currentCalorie}
        maxValue={calorieGoal}
        containerStyle={{
          width: "100%",
        }}
        title="Calorie Goal"
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          rowGap: spacing.large,
        }}
      >
        {nutritionGoals.map((nutritionGoal, index) => (
          <View
            key={`nutrition-goal-${index}`}
            style={{
              alignItems: "center",
              gap: spacing.medium,
            }}
          >
            <Text style={{ color: nutritionGoal.color }}>
              {nutritionGoal.title}
            </Text>
            <DonutChart
              radius={width * 0.1}
              value={nutritionGoal.value}
              maxValue={nutritionGoal.target}
              color={nutritionGoal.color}
              strokeWidth={6}
            >
              <View
                style={{
                  gap: spacing.tiny,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 14,
                  }}
                >
                  {nutritionGoal.value}
                </Text>
                <View
                  style={{
                    width: 35,
                    height: 1,
                    opacity: 0.5,
                    backgroundColor: nutritionGoal.color,
                  }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    color: "gray",
                    fontSize: 14,
                  }}
                >
                  {`${nutritionGoal.target}g`}
                </Text>
              </View>
            </DonutChart>
          </View>
        ))}
      </View>
    </View>
  );
};

export default NutritionGoalsSection;
