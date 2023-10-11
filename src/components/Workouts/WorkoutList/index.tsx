import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  LayoutAnimation,
  Platform,
  Pressable,
  UIManager,
  View,
} from "react-native";

import DayItem from "./DayItem";
import { WEEKLY_PROGRAM } from "../../../mockupData";
import { WorkoutsStackNavigationType } from "../../../navigation/WorkoutsStackNavigator";
import { spacing } from "../../../theme";
import { DAYS_LONG_EN } from "../../../utils/date";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const WorkoutList = () => {
  const navigation = useNavigation<WorkoutsStackNavigationType<"Workouts">>();

  const [isEditEnabled, setIsEditEnabled] = useState(false);

  const toggleEditState = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsEditEnabled((prev) => !prev);
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: isEditEnabled
        ? () => (
            <Pressable onPress={toggleEditState}>
              <Feather name="x" size={20} color="#fff" />
            </Pressable>
          )
        : undefined,
      headerRight: () =>
        isEditEnabled ? (
          <Pressable onPress={toggleEditState}>
            <Feather name="check" size={20} color="#fff" />
          </Pressable>
        ) : (
          <Pressable onPress={toggleEditState}>
            <Feather name="edit-2" size={18} color="#fff" />
          </Pressable>
        ),
    });
  }, [isEditEnabled, navigation]);

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
            isEditEnabled={isEditEnabled}
          />
        );
      })}
    </View>
  );
};

export default WorkoutList;
