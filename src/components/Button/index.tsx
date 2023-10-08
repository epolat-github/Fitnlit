import {
  Pressable,
  PressableProps,
  Text,
  TextStyle,
  StyleProp,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { colors, spacing } from "../../theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ButtonProps extends PressableProps {
  textStyle?: TextStyle;
  containerStyle?: StyleProp<ViewStyle>;
  text: string;
}

const Button = (props: ButtonProps) => {
  const { containerStyle, textStyle, text, ...rest } = props;

  const scale = useSharedValue(1);

  const onPressIn = () => {
    scale.value = withTiming(0.95);
  };

  const onPressOut = () => {
    scale.value = withTiming(1);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
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
      style={[
        {
          backgroundColor: colors.primary,
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
