import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import AnimatedBottomSheet from "../../../components/AnimatedBottomSheet";
import Button from "../../../components/Button";
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
  const [showAddWarning, setShowAddWarning] = useState(false);

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

  const addExercise = () => {
    setShowAddWarning(false);
    navigation.goBack();
  };

  return (
    <BottomSheetModalProvider>
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
              onPress={() => setShowAddWarning(true)}
            />
          ))}
        </View>

        <AnimatedBottomSheet
          open={showAddWarning}
          closeModal={() => setShowAddWarning(false)}
        >
          <View
            style={{
              paddingHorizontal: spacing.medium,
              paddingVertical: spacing.medium,
              alignItems: "center",
              gap: spacing.large,
            }}
          >
            <View
              style={{
                gap: spacing.small,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Add Exercise
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  lineHeight: 22,
                }}
              >
                Are you sure you want to add this exercise to the current day?
              </Text>
            </View>

            <Button text="Add Exercise" onPress={addExercise} />
          </View>
        </AnimatedBottomSheet>
      </ScrollView>
    </BottomSheetModalProvider>
  );
};

export default ExerciseList;
