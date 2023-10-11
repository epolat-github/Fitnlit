import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useMemo } from "react";
import { ScrollView, Text, View } from "react-native";

import Button from "../../../components/Button";
import ExerciseCard from "../../../components/ExerciseCard";
import EquipmentItem from "../../../components/Workouts/EquipmentItem";
import {
  WorkoutsStackNavigationRouteProp,
  WorkoutsStackNavigationType,
} from "../../../navigation/WorkoutsStackNavigator";
import { spacing } from "../../../theme";
import { Exercise } from "../../../types/exercise.type";

const WorkoutDayDetails = () => {
  const navigation =
    useNavigation<WorkoutsStackNavigationType<"WorkoutDayDetails">>();
  const {
    params: { dayName, dayDetails },
  } = useRoute<WorkoutsStackNavigationRouteProp<"WorkoutDayDetails">>();

  useEffect(() => {
    navigation.setOptions({
      title: dayName,
    });
  }, [dayName, navigation]);

  const equipments = useMemo(() => {
    return dayDetails.reduce<string[]>(
      (result, current) => [...result, ...current.equipments],
      [],
    );
  }, [dayDetails]);

  const navigateToExerciseDetails = (exercise: Exercise) => {
    navigation.navigate("ExerciseDetails", {
      exercise,
    });
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="always"
      // stickyHeaderIndices={[1]}
      contentContainerStyle={{
        paddingVertical: spacing.medium,
        gap: spacing.medium,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* EQUIPMENTS */}
      <View
        style={{
          gap: spacing.medium,
          paddingHorizontal: spacing.medium,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          Equipments for the day
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            rowGap: spacing.small,
          }}
        >
          {equipments.map((equipment, index) => (
            <EquipmentItem
              key={`equipment-${index}`}
              text="Barbell"
              icon={<Ionicons name="barbell-outline" size={24} />}
            />
          ))}
        </View>
      </View>
      {/* <BlurView
        intensity={15}
        tint="default"
        style={{
          width: "100%",
        }}
      > */}
      <View
        style={{
          paddingHorizontal: spacing.medium,
          paddingVertical: spacing.large,
        }}
      >
        <Button
          text="Start Workout"
          textStyle={{
            fontWeight: "bold",
          }}
        />
      </View>
      {/* </BlurView> */}

      <View
        style={{
          paddingHorizontal: spacing.medium,
        }}
      >
        {dayDetails.map((detail, index) => (
          <View key={`detail-${index}`}>
            <ExerciseCard
              onPress={() => navigateToExerciseDetails(detail)}
              exercise={detail}
            />

            {/* rest notifier and complete the day button */}
            <View
              style={{
                alignItems: "center",
                gap: spacing.small,
                marginVertical: spacing.medium,
              }}
            >
              <View
                style={{ height: 30, width: 2, backgroundColor: "lightgray" }}
              />
              {index !== dayDetails.length - 1 ? (
                <Text>60 seconds rest</Text>
              ) : (
                <Button text="Complete the Day" />
              )}
              <View
                style={{ height: 30, width: 2, backgroundColor: "lightgray" }}
              />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default WorkoutDayDetails;
