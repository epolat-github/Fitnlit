import { useHeaderHeight } from "@react-navigation/elements";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";

import Button from "../../../components/Button";
import DaySelector from "../../../components/DaySelector";
import FocusAwareStatusBar from "../../../components/FocusAwareStatusBar";
import ProgressBar from "../../../components/ProgressBar";
import TextInput from "../../../components/TextInput";
import {
  WEEKLY_STEP_COUNT,
  WEEKLY_WATER_CONSUMPTION,
} from "../../../mockupData";
import { colors, spacing } from "../../../theme";

const TARGET_STEP_COUNT = 30000;

const StepGoalDetail = () => {
  const headerHeight = useHeaderHeight();

  const [isLoading, setIsLoading] = useState(false);

  // moment starts from sunday
  const [selectedDayIndex, setSelectedDayIndex] = useState(
    (moment().day() + 6) % 7,
  );

  const [stepOfTheDay, setStepOfTheDay] = useState("");

  useEffect(() => {
    setStepOfTheDay(String(WEEKLY_STEP_COUNT[selectedDayIndex] || 0));
  }, [selectedDayIndex]);

  const averageStepCountOfTheWeek = useMemo(() => {
    const total = WEEKLY_WATER_CONSUMPTION.reduce(
      (prev, curr) => prev + (curr || 0),
      0,
    );

    return Math.round(total / 7);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.secondary,
      }}
    >
      <FocusAwareStatusBar style="light" animated />
      <View
        style={{
          backgroundColor: colors.secondary,
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

      <View
        style={{
          backgroundColor: "#F9F9FA",
          flex: 0.8,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingVertical: spacing.large,
        }}
      >
        <View
          style={{
            paddingHorizontal: spacing.medium,
            flex: 1,
            gap: spacing.huge,
            paddingBottom: spacing.medium,
          }}
        >
          <ProgressBar
            value={Number(stepOfTheDay)}
            maxValue={TARGET_STEP_COUNT}
            progressHeight={25}
            title="Daily target"
          />

          <View
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <View
              style={{
                alignItems: "center",
                gap: spacing.large,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  gap: spacing.small,
                }}
              >
                <TextInput
                  onChangeText={setStepOfTheDay}
                  value={stepOfTheDay}
                  placeholder="steps"
                  keyboardType="numeric"
                  returnKeyType="done"
                  returnKeyLabel="Done"
                  maxLength={5}
                  style={{
                    width: 200,
                    textAlign: "center",
                    fontSize: 22,
                    fontWeight: "500",
                  }}
                />
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >{`of ${TARGET_STEP_COUNT} steps`}</Text>
              </View>

              <View
                style={{
                  alignItems: "center",
                  gap: spacing.medium,
                  width: "70%",
                }}
              >
                <Text style={{ textAlign: "center" }}>
                  You average daily steps in this week is:
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  {averageStepCountOfTheWeek} steps
                </Text>
              </View>
            </View>
          </View>

          <Button
            text="Submit"
            disabled={stepOfTheDay.length === 0}
            isLoading={isLoading}
            onPress={() => {
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
              }, 3000);
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default StepGoalDetail;
