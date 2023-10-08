import { useHeaderHeight } from "@react-navigation/elements";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";

import DaySelector from "../../../components/DaySelector";
import FocusAwareStatusBar from "../../../components/FocusAwareStatusBar";
import WorkoutList from "../../../components/Workouts/WorkoutList";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { selectDayItemsYPosition } from "../../../slices/workoutsSlice";
import { spacing } from "../../../theme";

const Workouts = () => {
  const dayItemsYPosition = useAppSelector(selectDayItemsYPosition);

  const scrollViewRef = useRef<ScrollView>(null);
  const headerHeight = useHeaderHeight();

  // moment starts from sunday
  const [selectedDayIndex, setSelectedDayIndex] = useState(
    (moment().day() + 6) % 7,
  );

  useEffect(() => {
    if (
      scrollViewRef.current &&
      (dayItemsYPosition[selectedDayIndex] ||
        dayItemsYPosition[selectedDayIndex] === 0)
    ) {
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
      <FocusAwareStatusBar style="light" animated />
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
        }}
        showsVerticalScrollIndicator={false}
      >
        <WorkoutList />
      </ScrollView>
    </View>
  );
};

export default Workouts;
