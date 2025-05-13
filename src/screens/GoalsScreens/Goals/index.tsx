import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";

import FocusAwareStatusBar from "../../../components/FocusAwareStatusBar";
import GoalItem from "../../../components/GoalItem";
import SkeletonList from "../../../components/SkeletonList";
import { useSnackbarContext } from "../../../context/SnackbarContext";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import useToken from "../../../hooks/useToken";
import {
  GoalsStackNavigationType,
  GoalsStackParamList,
} from "../../../navigation/GoalsStackNavigator";
import { getGoalsAction } from "../../../slices/goalsSlice";
import { spacing } from "../../../theme";

const Goals = () => {
  const navigation = useNavigation<GoalsStackNavigationType<"Goals">>();

  const token = useToken();
  const { showSnackbar } = useSnackbarContext();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const getGoalsHandler = useCallback(async () => {
    try {
      if (!token) return;

      setIsLoading(true);

      await dispatch(getGoalsAction()).unwrap();

      setTimeout(() => {
        setIsLoading(false);
      }, 400);
    } catch (err: any) {
      setIsLoading(true);
      showSnackbar(err?.message, {
        variant: "error",
      });
    }
  }, [dispatch, showSnackbar, token]);

  useEffect(() => {
    getGoalsHandler();
  }, [getGoalsHandler]);

  const onCardPress = (to: Exclude<keyof GoalsStackParamList, "Goals">) => {
    navigation.navigate(to);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: spacing.medium,
      }}
    >
      <FocusAwareStatusBar style="dark" animated />

      <Text
        style={{
          color: "gray",
          paddingVertical: spacing.medium,
        }}
      >
        Here is your goals. You can track what you have accomplished!
      </Text>

      {isLoading ? (
        <SkeletonList
          count={4}
          style={{
            height: 120,
          }}
          contentContainerStyle={{
            gap: spacing.medium,
            paddingVertical: spacing.medium,
            paddingHorizontal: 0,
          }}
        />
      ) : (
        <ScrollView
          style={{
            flex: 1,
            flexDirection: "column",
          }}
          contentContainerStyle={{
            justifyContent: "center",
            gap: spacing.medium,
            paddingVertical: spacing.medium,
          }}
          showsVerticalScrollIndicator={false}
        >
          <GoalItem
            index={0}
            title="Water Consumption"
            image={require("../../../../assets/images/shared/water-with-lemon.png")}
            onPress={() => onCardPress("WaterGoalDetail")}
            titleStyle={{
              fontSize: 20,
              fontWeight: "500",
            }}
          />
          <GoalItem
            index={1}
            title="Step Count Monitor"
            image={require("../../../../assets/images/shared/step-count.png")}
            onPress={() => onCardPress("StepGoalDetail")}
            titleStyle={{
              fontSize: 20,
              fontWeight: "500",
            }}
          />
          <GoalItem
            index={2}
            title="Sleep Tracker"
            image={require("../../../../assets/images/shared/bed.png")}
            onPress={() => onCardPress("SleepGoalDetail")}
            titleStyle={{
              fontSize: 20,
              fontWeight: "500",
            }}
          />
          <GoalItem
            index={3}
            title="Nutrition Data"
            image={require("../../../../assets/images/shared/nutrition.png")}
            onPress={() => onCardPress("NutritionGoalDetail")}
            titleStyle={{
              fontSize: 20,
              fontWeight: "500",
            }}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default Goals;
