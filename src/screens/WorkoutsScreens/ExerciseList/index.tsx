import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";

import { WorkoutsStackNavigationType } from "../../../navigation/WorkoutsStackNavigator";
import { spacing } from "../../../theme";

const ExerciseList = () => {
  const navigation =
    useNavigation<WorkoutsStackNavigationType<"WorkoutDayDetails">>();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="always"
      // stickyHeaderIndices={[1]}
      contentContainerStyle={{
        paddingVertical: spacing.medium,
        gap: spacing.medium,
      }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ExerciseList;
