import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

import { TabNavigatorNavigationType } from "../../../navigation/TabNavigator";
import { colors, spacing } from "../../../theme";
import Button from "../../Button";

const ActiveWorkoutCard = () => {
  const navigation = useNavigation<TabNavigatorNavigationType<"HomeStack">>();

  const navigateToWorkouts = () => {
    navigation.jumpTo("WorkoutsStack");
  };

  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: spacing.medium,
        paddingVertical: spacing.medium * 1.5,
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: spacing.medium,
        overflow: "hidden",
      }}
    >
      <LinearGradient
        colors={["#aa80ff", "#7733ff"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
        start={{
          x: 0.3,
          y: 0.3,
        }}
        end={{
          x: 1,
          y: 1,
        }}
      />

      <Text
        style={{
          color: "#fff",
          fontWeight: "bold",
        }}
      >
        Glute Burning Heavy Workout
      </Text>

      <Button
        onPress={navigateToWorkouts}
        text="Continue"
        containerStyle={{
          backgroundColor: "#fff",
          width: 100,
          height: 35,
          borderRadius: spacing.large,
        }}
        textStyle={{
          color: colors.primary,
        }}
      />
    </View>
  );
};

export default ActiveWorkoutCard;
