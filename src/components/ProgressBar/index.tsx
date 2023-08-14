import { useEffect } from "react";
import { ColorValue, Text, View, ViewStyle } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import { spacing } from "../../theme";

interface ProgressBarType {
  progressHeight?: number;
  maxValue?: number;
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
    value = 0,
    progressHeight = 10,
    containerStyle,
    backgroundColor = "#bcdbff",
    progressColor = "#4c9ffe",
  } = props;

  const innerWidthPercentage = useSharedValue(0);

  useEffect(() => {
    const targetPercentage = (value / maxValue) * 100;

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
    };
  });

  return (
    <View style={[{ gap: spacing.small }, containerStyle]}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ width: 50 }}>{value}</Text>
        <Text>{title}</Text>
        <Text style={{ width: 50, textAlign: "right" }}>{maxValue}</Text>
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
              backgroundColor: progressColor,
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
