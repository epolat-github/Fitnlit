import { useEffect } from "react";
import { ColorValue, Text, View, ViewStyle } from "react-native";
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import { spacing } from "../../theme";

interface ProgressBarType {
  progressHeight?: number;
  maxValue?: number;
  minValue?: number;
  value: number;
  containerStyle?: ViewStyle;
  title?: string;
  backgroundColor?: ColorValue;
  progressColor?: ColorValue;
}

const ProgressBar: React.FC<ProgressBarType> = (props) => {
  const {
    title,
    maxValue = 100,
    minValue = 0,
    value = 0,
    progressHeight = 10,
    containerStyle,
    backgroundColor = "#bcdbff",
    progressColor = "#4c9ffe",
  } = props;

  const innerWidthPercentage = useSharedValue(0);
  const calculatedBackgroundColor = useDerivedValue(() => {
    const isFull = value >= maxValue;

    return isFull
      ? withTiming(1, { duration: 300, easing: Easing.inOut(Easing.ease) })
      : withTiming(0, { duration: 300, easing: Easing.inOut(Easing.ease) });
  });

  useEffect(() => {
    let targetPercentage = (value / maxValue) * 100;

    targetPercentage = targetPercentage >= 100 ? 100 : targetPercentage;

    innerWidthPercentage.value = withDelay(
      150,
      withTiming(targetPercentage, {
        duration: 600,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    );
  }, [innerWidthPercentage, maxValue, value]);

  const innerWidthStyle = useAnimatedStyle(() => {
    return {
      width: `${innerWidthPercentage.value}%`,
      backgroundColor: interpolateColor(
        calculatedBackgroundColor.value,
        [0, 1],
        [progressColor.toString(), "green"],
      ),
    };
  });

  return (
    <View style={[{ gap: spacing.small }, containerStyle]}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ width: 50, color: "gray" }}>{minValue}</Text>
        <Text style={{ fontWeight: "500" }}>{title}</Text>
        <Text style={{ width: 50, textAlign: "right", color: "gray" }}>
          {maxValue}
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          backgroundColor,
          borderRadius: 20,
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "row",
          height: progressHeight,
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={[
            {
              height: "100%",
              borderRadius: 10,
            },
            innerWidthStyle,
          ]}
        />
      </View>
    </View>
  );
};

export default ProgressBar;
