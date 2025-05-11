import { forwardRef } from "react";
import {
  TextInput as BaseTextInput,
  StyleSheet,
  TextInputProps as BaseTextInputProps,
  View,
  Text,
} from "react-native";

import { spacing } from "../../theme";

interface TextInputProps extends BaseTextInputProps {
  rightIcon?: React.ReactNode | (() => React.ReactNode);
  error?: string;
}

export type TextInputRef = BaseTextInput;

const TextInput = forwardRef<TextInputRef, TextInputProps>((props, ref) => {
  const { style, rightIcon, error, ...restProps } = props;

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <BaseTextInput
          ref={ref}
          style={[styles.input, style]}
          autoCorrect={false}
          {...restProps}
        />
        {typeof rightIcon === "function" ? rightIcon() : rightIcon}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
});

export default TextInput;

const styles = StyleSheet.create({
  container: {
    gap: spacing.tiny,
    height: 70,
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F8FA",
    borderColor: "#EAECEF",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 55,
  },
  input: {
    flex: 1,
    paddingRight: 10,
  },
  errorText: {
    color: "tomato",
    paddingLeft: 5,
  },
});
