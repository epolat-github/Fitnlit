import {
  Pressable,
  PressableProps,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { colors, spacing } from "../../theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ButtonProps extends PressableProps {
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
  text: string;
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const { containerStyle, textStyle, text, disabled, ...rest } = props;

  const scale = useSharedValue(1);
  const backgroundColor = useDerivedValue(() => {
    return disabled
      ? withTiming(0, { duration: 300, easing: Easing.inOut(Easing.ease) })
      : withTiming(1, { duration: 300, easing: Easing.inOut(Easing.ease) });
  });

  const onPressIn = () => {
    scale.value = withTiming(0.95);
  };

  const onPressOut = () => {
    scale.value = withTiming(1);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        backgroundColor.value,
        [0, 1],
        ["gray", containerStyle?.backgroundColor?.toString() ?? colors.primary],
      ),

      transform: [
        {
          scale: scale.value,
        },
      ],
    };
  });

  return (
    <AnimatedPressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled}
      style={[
        {
          height: 50,
          borderRadius: spacing.medium,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        containerStyle,
        animatedStyle,
      ]}
      {...rest}
    >
      <Text
        style={[
          {
            fontSize: 14,
            fontWeight: "500",
            color: "#fff",
          },
          textStyle,
        ]}
      >
        {text}
      </Text>
    </AnimatedPressable>
  );
};

export default Button;
