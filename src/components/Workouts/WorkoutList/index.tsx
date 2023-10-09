import { View } from "react-native";

import DayItem from "./DayItem";
import { WEEKLY_PROGRAM } from "../../../mockupData";
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
            data={WEEKLY_PROGRAM[index]}
          />
        );
      })}
    </View>
  );
};

export default WorkoutList;
