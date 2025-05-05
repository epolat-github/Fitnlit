import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { useCallback, useMemo, useState } from "react";
import { LayoutChangeEvent, Pressable, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { WorkoutsStackNavigationType } from "../../../../navigation/WorkoutsStackNavigator";
import { setDayItemsYPosition } from "../../../../slices/workoutsSlice";
import { spacing } from "../../../../theme";
import { Exercise } from "../../../../types/exercise.type";
import { toFirstLetterCapital } from "../../../../utils/text";
import AnimatedBottomSheet from "../../../AnimatedBottomSheet";
import Button from "../../../Button";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ExerciseItemType {
  onPress: () => unknown;
  onDelete: () => unknown;
  isEditEnabled: boolean;
  exercise: Exercise;
}

const ExerciseItem: React.FC<ExerciseItemType> = (props) => {
  const { exercise, isEditEnabled, onPress, onDelete } = props;

  return (
    <AnimatedPressable onPress={onPress}>
      <View
        style={{
          backgroundColor: "#f1f1f1",
          borderRadius: 8,
          paddingHorizontal: spacing.medium,
          paddingVertical: spacing.tiny,
          flexDirection: "row",
          alignItems: "center",
          gap: spacing.tiny,
          overflow: "hidden",
        }}
      >
        {exercise.isCompleted && (
          <Feather name="check" size={16} color="black" />
        )}

        <Text>{exercise.name}</Text>

        {isEditEnabled && (
          <AnimatedPressable onPress={onDelete}>
            <Feather name="x" size={16} color="tomato" />
          </AnimatedPressable>
        )}
      </View>
    </AnimatedPressable>
  );
};

interface DayItemType {
  day: string;
  index: number;
  isRestDay?: boolean;
  data?: Exercise[];
  isEditEnabled: boolean;
}

const DayItem: React.FC<DayItemType> = (props) => {
  const { day, index, data, isEditEnabled } = props;

  const isRestDay = !data;

  const navigation = useNavigation<WorkoutsStackNavigationType<"Workouts">>();

  const dispatch = useAppDispatch();

  const isCurrentDay = useMemo(() => moment().day() - 1 === index, [index]); // moment starts from sunday

  const [exerciseToDelete, setExerciseToDelete] = useState<Exercise>();

  const onLayout = (event: LayoutChangeEvent) => {
    dispatch(
      setDayItemsYPosition({
        index,
        yPosition: event.nativeEvent.layout.y,
      }),
    );
  };

  const navigateToExerciseDetails = useCallback(
    (exercise: Exercise) => {
      navigation.navigate("ExerciseDetails", {
        exercise,
      });
    },
    [navigation],
  );

  const navigateToWorkoutDayDetails = useCallback(() => {
    if (!data) return;

    navigation.navigate("WorkoutDayDetails", {
      dayName: day,
      dayDetails: data,
    });
  }, [data, day, navigation]);

  const navigateToExerciseList = useCallback(() => {
    navigation.navigate("ExerciseList");
  }, [navigation]);

  const onDeleteExercise = useCallback(async (exercise: Exercise) => {
    setExerciseToDelete(exercise);
  }, []);

  return (
    <AnimatedPressable
      onPress={isRestDay ? navigateToExerciseList : navigateToWorkoutDayDetails}
      entering={FadeInDown.delay(index * 100)}
      style={{
        paddingHorizontal: spacing.medium,
        paddingVertical: spacing.medium,
        backgroundColor: "#fff",
        borderRadius: 10,
        width: "100%",
        gap: spacing.large,
      }}
      onLayout={onLayout}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            color: isCurrentDay ? "#8B80F8" : "#000",
          }}
        >
          {`${toFirstLetterCapital(day)}${
            isCurrentDay ? " - current day" : ""
          }`}
        </Text>

        <Pressable onPress={navigateToExerciseList}>
          <Ionicons name="add-circle-outline" size={25} />
        </Pressable>
      </View>

      {isRestDay && (
        <View>
          <Text
            style={{
              color: "gray",
              fontWeight: "600",
              fontSize: 20,
            }}
          >
            Rest Day
          </Text>
        </View>
      )}

      {!isRestDay && (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: spacing.medium,
          }}
        >
          {data.map((exercise, index) => (
            <ExerciseItem
              key={`exercise-item-${index}`}
              onPress={() => navigateToExerciseDetails(exercise)}
              exercise={exercise}
              isEditEnabled={isEditEnabled}
              onDelete={() => onDeleteExercise(exercise)}
            />
          ))}
        </View>
      )}

      <AnimatedBottomSheet
        open={!!exerciseToDelete}
        closeModal={() => setExerciseToDelete(undefined)}
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
              Delete Exercise
            </Text>
            <Text
              style={{
                textAlign: "center",
                lineHeight: 22,
              }}
            >
              Are you sure you want to remove this exercise from the day?
            </Text>
          </View>

          <Button
            text="Remove"
            containerStyle={{
              backgroundColor: "red",
            }}
            onPress={() => setExerciseToDelete(undefined)}
          />
        </View>
      </AnimatedBottomSheet>
    </AnimatedPressable>
  );
};

export default DayItem;
