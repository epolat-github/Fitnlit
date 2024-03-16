import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Text, View } from "react-native";

import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import { AuthStackNavigationType } from "../../../navigation/AuthNavigator";
import { generateForgotPasswordKey } from "../../../services/auth.service";
import { spacing } from "../../../theme";

const ForgotPassword = () => {
  const navigation = useNavigation<AuthStackNavigationType<"ForgotPassword">>();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendPasswordResetCode = async () => {
    setIsLoading(true);

    await generateForgotPasswordKey({
      email,
    });

    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate("CheckForgotPasswordKey", {
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
          Reset Password
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: "#1E232C",
          }}
        >
          Reset your password by entering the email address that you registered.
          We will send you a reset link. Please check your spam folder too.
        </Text>
      </View>

      <View
        style={{
          paddingHorizontal: spacing.medium,
          gap: spacing.large,
        }}
      >
        <TextInput
          autoFocus
          onChangeText={setEmail}
          value={email}
          placeholder="Enter email address"
          autoComplete="email"
          keyboardType="email-address"
          maxLength={50}
        />

        <Button
          text="Continue"
          onPress={sendPasswordResetCode}
          isLoading={isLoading}
          disabled={email === ""}
        />
      </View>
    </View>
  );
};

export default ForgotPassword;
