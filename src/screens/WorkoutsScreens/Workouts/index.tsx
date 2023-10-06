import { useHeaderHeight } from "@react-navigation/elements";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

import DaySelector from "../../../components/DaySelector";

const Workouts = () => {
  const headerHeight = useHeaderHeight();

  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

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
        style={{
          backgroundColor: "#fff",
          flex: 0.8,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
      >
        <Text>test</Text>
      </ScrollView>
    </View>
  );
};

export default Workouts;
