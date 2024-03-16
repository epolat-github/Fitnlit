import { useEffect } from "react";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { spacing } from "../../theme";

interface BadgeType {
  text: string;
  isSuccess: boolean;
}

const Badge: React.FC<BadgeType> = (props) => {
  const { isSuccess = false, text } = props;

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(isSuccess ? 1 : 0, {
      duration: 300,
    });
  }, [isSuccess, progress]);

  const containerStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      progress.value,
      [0, 0.25, 0.5, 0.75, 1],
      [0, 5, 0, -5, 0],
    );

    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        ["#F7F8FA", "#D8ECE7"],
      ),
      transform: [
        {
          translateX,
        },
      ],
    };
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(progress.value, [0, 1], ["#A5A6A9", "#56AA95"]),
    };
  });

  return (
    <Animated.View
      style={[
        {
          paddingVertical: spacing.small,
          paddingHorizontal: spacing.medium,
          borderRadius: spacing.large,
        },
        containerStyle,
      ]}
    >
      <Animated.Text
        style={[
          {
            fontSize: 12,
            fontWeight: "500",
          },
          textStyle,
        ]}
      >
        {text}
      </Animated.Text>
    </Animated.View>
  );
};

export default Badge;
