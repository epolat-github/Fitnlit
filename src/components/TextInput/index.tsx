import { ReactNode, forwardRef } from "react";
import { TextInput as BaseTextInput, TextInputProps } from "react-native";

import { spacing } from "../../theme";

interface Props {
  children?: ReactNode;
  type: "submit" | "button";
}
export type TextInputRef = BaseTextInput;

const TextInput = forwardRef<TextInputRef, TextInputProps>((props, ref) => {
  const { style, ...restProps } = props;

  return (
    <BaseTextInput
      ref={ref}
      autoCapitalize="none"
      autoCorrect={false}
      style={[
        {
          backgroundColor: "#F7F8FA",
          height: 55,
          borderColor: "#EAECEF",
          borderWidth: 1,
          borderRadius: spacing.medium,
          paddingHorizontal: spacing.medium,
        },
        style,
      ]}
      {...restProps}
    />
  );
});

export default TextInput;
