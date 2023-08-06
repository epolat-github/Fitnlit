import { ReactNode } from "react";
import {
  Pressable,
  PressableProps,
  Text,
  TextStyle,
  StyleProp,
  ViewStyle,
} from "react-native";

import { spacing } from "../../theme";

interface ButtonProps extends PressableProps {
  textStyle?: TextStyle;
  containerStyle?: StyleProp<ViewStyle>;
  text: string;
}

const Button = (props: ButtonProps) => {
  const { containerStyle, textStyle, text, ...rest } = props;

  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: "#5500FF",
          height: 50,
          borderRadius: spacing.medium,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        containerStyle,
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
    </Pressable>
  );
};

export default Button;
