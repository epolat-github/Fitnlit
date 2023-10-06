import { View } from "react-native";

import DayItem from "./DayItem";
import { spacing } from "../../../theme";
import { DAYS_LONG_EN } from "../../../utils/date";

const WorkoutList = () => {
  return (
    <View
      style={{
        alignItems: "center",
        paddingHorizontal: spacing.medium,
        gap: spacing.large,
      }}
    >
      {DAYS_LONG_EN.map((day, index) => {
        return (
          <DayItem
            key={`day-${index}`}
            day={day}
            index={index}
            isRestDay={index === 2}
          />
        );
      })}
    </View>
  );
};

export default WorkoutList;
