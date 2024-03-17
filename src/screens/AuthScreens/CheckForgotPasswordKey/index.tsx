import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CodeField, Cursor } from "react-native-confirmation-code-field";

import Button from "../../../components/Button";
import {
  AuthStackNavigationRouteProp,
  AuthStackNavigationType,
} from "../../../navigation/AuthNavigator";
import { checkForgotPasswordKey } from "../../../services/auth.service";
import { spacing } from "../../../theme";

const codeFieldStyles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    borderRadius: spacing.medium,
    width: 50,
    height: 50,
    lineHeight: 45,
    fontSize: 24,
    borderWidth: 1,
    borderColor: "#00000030",
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#000",
  },
});

const CheckForgotPasswordKey = () => {
  const navigation =
    useNavigation<AuthStackNavigationType<"CheckForgotPasswordKey">>();
  const route =
    useRoute<AuthStackNavigationRouteProp<"CheckForgotPasswordKey">>();

  const { email } = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");

  const checkForgotPasswordKeyHandler = async () => {
    setIsLoading(true);

    await checkForgotPasswordKey({
      email,
      key: code,
    });

    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate("SetupNewPassword", {
        email,
      });
    }, 2000);
  };

  return (
    <View
      style={{
        flex: 1,
        gap: spacing.large,
      }}
    >
      {/* HEADER */}
      <View style={{ flex: 0.2, gap: 15, paddingHorizontal: spacing.medium }}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: "#1E232C",
            textAlign: "center",
          }}
        >
          Confirm Reset Code
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: "#1E232C",
          }}
        >
          {`We have sent the confirmation code to ${email}. In the email you'll receive, there should be a six digit code to put here.`}
        </Text>
      </View>

      <View
        style={{
          paddingHorizontal: spacing.medium,
          gap: spacing.large,
        }}
      >
        <CodeField
          value={code}
          onChangeText={setCode}
          cellCount={6}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoFocus
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[
                codeFieldStyles.cell,
                isFocused && codeFieldStyles.focusCell,
              ]}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />

        <Button
          text="Continue"
          onPress={checkForgotPasswordKeyHandler}
          isLoading={isLoading}
          disabled={code.length !== 6}
        />
      </View>
    </View>
  );
};

export default CheckForgotPasswordKey;
