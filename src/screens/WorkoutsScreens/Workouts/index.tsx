import { useHeaderHeight } from "@react-navigation/elements";
import { StatusBar } from "expo-status-bar";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";

import DaySelector from "../../../components/DaySelector";
import WorkoutList from "../../../components/Workouts/WorkoutList";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { selectDayItemsYPosition } from "../../../slices/workoutsSlice";
import { spacing } from "../../../theme";

const Workouts = () => {
  const dayItemsYPosition = useAppSelector(selectDayItemsYPosition);

  const scrollViewRef = useRef<ScrollView>(null);
  const headerHeight = useHeaderHeight();

  const [selectedDayIndex, setSelectedDayIndex] = useState(moment().day() - 1);

  useEffect(() => {
    const currentDayIndex = moment().day() - 1; // moment starts from sunday

    if (scrollViewRef.current && dayItemsYPosition[currentDayIndex]) {
      scrollViewRef?.current?.scrollTo({
        x: 0,
        y: dayItemsYPosition[selectedDayIndex],
        animated: true,
      });
    }
  }, [dayItemsYPosition, selectedDayIndex]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#8B80F8",
      }}
    >
      <StatusBar style="light" />
      <View
        style={{
          backgroundColor: "#8B80F8",
          flex: 0.2,
          paddingTop: headerHeight,
          justifyContent: "center",
        }}
      >
        <DaySelector
          selectedDayIndex={selectedDayIndex}
          changeSelectedDayIndex={setSelectedDayIndex}
        />
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={{
          backgroundColor: "#F9F9FA",
          flex: 0.8,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
        contentContainerStyle={{
          paddingVertical: spacing.large,
          // backgroundColor: "#F9F9FA",
        }}
        showsVerticalScrollIndicator={false}
      >
        <WorkoutList />
      </ScrollView>
    </View>
  );
};

export default Workouts;
