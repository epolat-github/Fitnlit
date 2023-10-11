import { useNavigation } from "@react-navigation/native";
import { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";

import ExerciseCard from "../../../components/ExerciseCard";
import FilterPanel from "../../../components/FilterPanel";
import FocusAwareStatusBar from "../../../components/FocusAwareStatusBar";
import { ALL_EXERCISES } from "../../../mockupData";
import { WorkoutsStackNavigationType } from "../../../navigation/WorkoutsStackNavigator";
import { spacing } from "../../../theme";
import { Exercise } from "../../../types/exercise.type";

const ExerciseList = () => {
  const navigation =
    useNavigation<WorkoutsStackNavigationType<"WorkoutDayDetails">>();

  const [searchValue, setSearchValue] = useState("");

  const filteredExercises = useMemo(() => {
    let newFilteredExercises = ALL_EXERCISES;

    // filter search value
    if (searchValue === "") {
      return newFilteredExercises;
    }

    newFilteredExercises = newFilteredExercises?.filter(
      (exercise: Exercise) => {
        const isExerciseNameFound = exercise.name
          .toLowerCase()
          .includes(searchValue.toLowerCase());

        return isExerciseNameFound;
      },
    );

    return newFilteredExercises;
  }, [searchValue]);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="always"
      contentContainerStyle={{
        paddingVertical: spacing.medium,
        gap: spacing.large,
      }}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag"
    >
      <FocusAwareStatusBar style="light" />

      <View
        style={{
          width: "100%",
        }}
      >
        <FilterPanel
          value={searchValue}
          setValue={setSearchValue}
          onClear={() => setSearchValue("")}
          placeholder="Search for an exercise"
        />
      </View>

      <View
        style={{
          paddingHorizontal: spacing.medium,
          gap: spacing.large,
        }}
      >
        {filteredExercises.map((exercise, index) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onPress={() => alert("added")}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default ExerciseList;
