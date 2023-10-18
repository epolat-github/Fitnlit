import Slider from "@react-native-community/slider";
import { useHeaderHeight } from "@react-navigation/elements";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";

import Button from "../../../components/Button";
import DaySelector from "../../../components/DaySelector";
import FocusAwareStatusBar from "../../../components/FocusAwareStatusBar";
import { WEEKLY_SLEEP_HOURS } from "../../../mockupData";
import { colors, spacing } from "../../../theme";

const SleepGoalDetail = () => {
  const headerHeight = useHeaderHeight();

  const [isLoading, setIsLoading] = useState(false);

  // moment starts from sunday
  const [selectedDayIndex, setSelectedDayIndex] = useState(
    (moment().day() + 6) % 7,
  );

  const [hourOfTheDay, setHourOfTheDay] = useState(0);

  useEffect(() => {
    setHourOfTheDay(WEEKLY_SLEEP_HOURS[selectedDayIndex] || 0);
  }, [selectedDayIndex]);

  const averageSleepHoursOfTheWeek = useMemo(() => {
    const total = WEEKLY_SLEEP_HOURS.reduce(
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
          <View
            style={{
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <View
              style={{
                gap: spacing.large,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  gap: spacing.small,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 22,
                  }}
                >
                  {hourOfTheDay} hours
                </Text>

                <Slider
                  style={{ width: "100%" }}
                  minimumValue={0}
                  maximumValue={10}
                  step={0.5}
                  minimumTrackTintColor={colors.secondary}
                  tapToSeek
                  onValueChange={setHourOfTheDay}
                  value={hourOfTheDay}
                />
              </View>

              <View
                style={{
                  alignItems: "center",
                  gap: spacing.medium,
                  width: "70%",
                  alignSelf: "center",
                }}
              >
                <Text style={{ textAlign: "center" }}>
                  You average daily nightly sleep in this week is:
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  {averageSleepHoursOfTheWeek} hours
                </Text>
              </View>
            </View>
          </View>

          <Button
            text="Submit"
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

export default SleepGoalDetail;
