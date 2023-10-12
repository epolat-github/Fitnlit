import { Text, View, useWindowDimensions } from "react-native";

import { spacing } from "../../theme";
import DonutChart from "../DonutChart";
import ProgressBar from "../ProgressBar";

interface NutritionGoalsSectionType {
  data: any[];
}

const NutritionGoalsSection: React.FC<NutritionGoalsSectionType> = ({
  data,
}) => {
  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        gap: spacing.large,
      }}
    >
      <ProgressBar
        value={70}
        maxValue={100}
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
        {data.map((data, index) => (
          <View
            key={`nutrition-data-${index}`}
            style={{
              alignItems: "center",
              gap: spacing.medium,
            }}
          >
            <Text style={{ color: data.color }}>{data.title}</Text>
            <DonutChart
              radius={width * 0.1}
              value={data.value}
              maxValue={data.target}
              color={data.color}
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
                  {data.value}
                </Text>
                <View
                  style={{
                    width: 35,
                    height: 1,
                    opacity: 0.5,
                    backgroundColor: data.color,
                  }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    color: "gray",
                    fontSize: 14,
                  }}
                >
                  {`${data.target}g`}
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
