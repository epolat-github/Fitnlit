import { useHeaderHeight } from "@react-navigation/elements";
import moment from "moment";
import { useMemo, useState } from "react";
import { Text, View } from "react-native";

import Button from "../../../components/Button";
import DaySelector from "../../../components/DaySelector";
import FocusAwareStatusBar from "../../../components/FocusAwareStatusBar";
import ProgressBar from "../../../components/ProgressBar";
import TextInput from "../../../components/TextInput";
import { useSnackbarContext } from "../../../context/SnackbarContext";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { selectGoals, updateGoalsAction } from "../../../slices/goalsSlice";
import { colors, spacing } from "../../../theme";
import { GOAL, GoalsResponse } from "../../../types/goals.type";

const StepGoalDetail = () => {
  const headerHeight = useHeaderHeight();
  const { showSnackbar } = useSnackbarContext();

  const goals = useAppSelector(selectGoals);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const { totalStep, step } = goals as GoalsResponse;

  const todayIndex = (moment().day() + 6) % 7;

  // moment starts from sunday, our index starts from 0
  const [selectedDayIndex, setSelectedDayIndex] = useState(
    (moment().day() + 6) % 7,
  );

  const isTodaySelected = todayIndex === selectedDayIndex;

  const [newSteps, setNewSteps] = useState("");

  const stepsOfCurrentDay = step[selectedDayIndex];

  const averageStepCountOfTheWeek = useMemo(() => {
    const total = step.reduce((prev, curr) => prev + (curr || 0), 0);

    return Math.round(total / 7);
  }, [step]);

  const updateStepGoalHandler = async () => {
    try {
      setIsLoading(true);

      await dispatch(
        updateGoalsAction({
          dailyGoal: GOAL.STEP,
          value: Number(newSteps),
        }),
      ).unwrap();

      setNewSteps("");
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
          <ProgressBar
            value={stepsOfCurrentDay}
            maxValue={totalStep}
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
                {isTodaySelected ? (
                  <TextInput
                    onChangeText={setNewSteps}
                    value={newSteps}
                    placeholder="Add Steps"
                    keyboardType="numeric"
                    returnKeyType="done"
                    returnKeyLabel="Done"
                    maxLength={5}
                    containerStyle={{
                      width: 200,
                    }}
                    style={{
                      textAlign: "center",
                      fontSize: 22,
                      fontWeight: "500",
                    }}
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: 20,
                    }}
                  >
                    Bugün {stepsOfCurrentDay} adım atıldı
                  </Text>
                )}

                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >{`of ${totalStep} steps`}</Text>
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
            disabled={newSteps.length === 0}
            isLoading={isLoading}
            onPress={updateStepGoalHandler}
          />
        </View>
      </View>
    </View>
  );
};

export default StepGoalDetail;
