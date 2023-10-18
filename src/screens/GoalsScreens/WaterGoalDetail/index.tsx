import { useHeaderHeight } from "@react-navigation/elements";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";

import Button from "../../../components/Button";
import DaySelector from "../../../components/DaySelector";
import FocusAwareStatusBar from "../../../components/FocusAwareStatusBar";
import ProgressBar from "../../../components/ProgressBar";
import TextInput from "../../../components/TextInput";
import { WEEKLY_WATER_CONSUMPTION } from "../../../mockupData";
import { colors, spacing } from "../../../theme";

const TARGET_WATER_CONSUMPTION = 3000;

const WaterGoalDetail = () => {
  const headerHeight = useHeaderHeight();

  const [isLoading, setIsLoading] = useState(false);

  // moment starts from sunday
  const [selectedDayIndex, setSelectedDayIndex] = useState(
    (moment().day() + 6) % 7,
  );

  const [consumptionOfTheDay, setConsumptionOfTheDay] = useState("");

  useEffect(() => {
    setConsumptionOfTheDay(
      String(WEEKLY_WATER_CONSUMPTION[selectedDayIndex] || 0),
    );
  }, [selectedDayIndex]);

  const averageWaterConsumptionOfTheWeek = useMemo(() => {
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
            value={Number(consumptionOfTheDay)}
            maxValue={TARGET_WATER_CONSUMPTION}
            progressHeight={25}
            title="Weekly target"
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
                  onChangeText={setConsumptionOfTheDay}
                  value={consumptionOfTheDay}
                  placeholder="ml"
                  keyboardType="numeric"
                  maxLength={4}
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
                >{`of ${TARGET_WATER_CONSUMPTION} ML`}</Text>
              </View>

              <View
                style={{
                  alignItems: "center",
                  gap: spacing.medium,
                  width: "70%",
                }}
              >
                <Text style={{ textAlign: "center" }}>
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
            disabled={consumptionOfTheDay.length === 0}
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

export default WaterGoalDetail;
