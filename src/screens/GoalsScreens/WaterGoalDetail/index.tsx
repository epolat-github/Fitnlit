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

const WaterGoalDetail = () => {
  const headerHeight = useHeaderHeight();
  const { showSnackbar } = useSnackbarContext();

  const goals = useAppSelector(selectGoals);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const { totalWater, water } = goals as GoalsResponse;

  const todayIndex = (moment().day() + 6) % 7;

  // moment starts from sunday, our index starts from 0
  const [selectedDayIndex, setSelectedDayIndex] = useState(todayIndex);

  const isTodaySelected = todayIndex === selectedDayIndex;

  const [newConsumption, setNewConsumption] = useState("");

  const consumptionOfCurrentDay = water[selectedDayIndex];

  const averageWaterConsumptionOfTheWeek = useMemo(() => {
    const total = water.reduce((prev, curr) => prev + (curr || 0), 0);

    return Math.round(total / 7);
  }, [water]);

  const updateWaterGoalHandler = async () => {
    try {
      setIsLoading(true);

      await dispatch(
        updateGoalsAction({
          dailyGoal: GOAL.WATER,
          value: Number(newConsumption),
        }),
      ).unwrap();

      setNewConsumption("");
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
            gap: spacing.large,
            paddingBottom: spacing.medium,
          }}
        >
          <ProgressBar
            value={consumptionOfCurrentDay}
            maxValue={totalWater}
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
                    onChangeText={setNewConsumption}
                    value={newConsumption}
                    placeholder="Add Water"
                    keyboardType="numeric"
                    returnKeyType="done"
                    returnKeyLabel="Done"
                    maxLength={4}
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
                    Bugün {consumptionOfCurrentDay}mL su içildi
                  </Text>
                )}

                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >{`of ${totalWater} ML`}</Text>
              </View>

              <View
                style={{
                  alignItems: "center",
                  gap: spacing.medium,
                  width: "70%",
                }}
              >
                <Text
                  style={{ textAlign: "center", fontSize: 16, lineHeight: 22 }}
                >
                  You average daily water consumption in this week is:
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  {averageWaterConsumptionOfTheWeek} ml
                </Text>
              </View>
            </View>
          </View>

          <Button
            text="Submit"
            disabled={newConsumption.length === 0}
            isLoading={isLoading}
            onPress={updateWaterGoalHandler}
          />
        </View>
      </View>
    </View>
  );
};

export default WaterGoalDetail;
