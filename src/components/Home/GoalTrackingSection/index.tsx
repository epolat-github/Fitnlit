import { View } from "react-native";

import GoalItem from "../../GoalItem";

const WATER_USAGE = 1500;
const STEP_COUNT = 13000;
const SLEEP_HOURS = 8;

const GoalTrackingSection = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <GoalItem
        title="Water"
        value={`${WATER_USAGE} ml`}
        image={require("../../../../assets/images/shared/water-with-lemon.png")}
        index={0}
      />
      <GoalItem
        title="Steps"
        value={STEP_COUNT}
        image={require("../../../../assets/images/shared/step-count.png")}
        index={1}
      />
      <GoalItem
        title="Sleep"
        value={`${SLEEP_HOURS} hours`}
        image={require("../../../../assets/images/shared/bed.png")}
        index={2}
      />
    </View>
  );
};

export default GoalTrackingSection;
