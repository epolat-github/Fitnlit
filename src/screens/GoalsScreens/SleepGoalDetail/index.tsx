import Slider from "@react-native-community/slider";
import { useHeaderHeight } from "@react-navigation/elements";
import moment from "moment";
import { useMemo, useState } from "react";
import { Text, View } from "react-native";

import Button from "../../../components/Button";
import DaySelector from "../../../components/DaySelector";
import FocusAwareStatusBar from "../../../components/FocusAwareStatusBar";
import { useSnackbarContext } from "../../../context/SnackbarContext";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { selectGoals, updateGoalsAction } from "../../../slices/goalsSlice";
import { colors, spacing } from "../../../theme";
import { GOAL, GoalsResponse } from "../../../types/goals.type";

const SleepGoalDetail = () => {
  const headerHeight = useHeaderHeight();
  const { showSnackbar } = useSnackbarContext();

  const goals = useAppSelector(selectGoals);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const { sleep } = goals as GoalsResponse;

  const todayIndex = (moment().day() + 6) % 7;

  // moment starts from sunday, our index starts from 0
  const [selectedDayIndex, setSelectedDayIndex] = useState(todayIndex);

  const isTodaySelected = todayIndex === selectedDayIndex;

  const [newSleepValue, setNewSleepValue] = useState(0);

  const sleepOfCurrentDay = sleep[selectedDayIndex];

  const averageSleepHoursOfTheWeek = useMemo(() => {
    const total = sleep.reduce((prev, curr) => prev + (curr || 0), 0);

    return Math.round(total / 7);
  }, [sleep]);

  const updateSleepGoalHandler = async () => {
    try {
      setIsLoading(true);

      console.log(newSleepValue);

      await dispatch(
        updateGoalsAction({
          dailyGoal: GOAL.SLEEP,
          value: newSleepValue,
        }),
      ).unwrap();

      setNewSleepValue(0);
      showSnackbar("Çaban için tebrik ederiz!", {
        variant: "success",
      });
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      showSnackbar(err?.message, {
        variant: "error",
      });
    }
  };

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
              {isTodaySelected && (
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
                    {newSleepValue} hours
                  </Text>

                  <Slider
                    style={{ width: "100%" }}
                    minimumValue={0}
                    maximumValue={10}
                    step={0.5}
                    minimumTrackTintColor={colors.secondary}
                    tapToSeek
                    onValueChange={setNewSleepValue}
                    value={newSleepValue}
                  />
                </View>
              )}

              <View
                style={{
                  alignItems: "center",
                  gap: spacing.medium,
                  width: "70%",
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{ textAlign: "center", fontWeight: 500, fontSize: 20 }}
                >
                  Bugün {sleepOfCurrentDay} saat uyudunuz
                </Text>

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
            onPress={updateSleepGoalHandler}
          />
        </View>
      </View>
    </View>
  );
};

export default SleepGoalDetail;
