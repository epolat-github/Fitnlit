import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import { Text, View } from "react-native";

import Acknowledgement from "../../../components/Acknowledgement";
import Badge from "../../../components/Badge";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import {
  AuthStackNavigationRouteProp,
  AuthStackNavigationType,
} from "../../../navigation/AuthNavigator";
import { registerAction } from "../../../slices/authSlice";
import { spacing } from "../../../theme";

const SetupPassword = () => {
  const route = useRoute<AuthStackNavigationRouteProp<"SetupPassword">>();
  const navigation = useNavigation<AuthStackNavigationType<"Register">>();
  const dispatch = useAppDispatch();

  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const { email, firstName, lastName } = route.params;

  const criteriaStatus = useMemo(() => {
    const lowercaseLetters = /[a-z]/.test(passwordValue);
    const uppercaseLetters = /[A-Z]/.test(passwordValue);
    const minCharacters = passwordValue.length >= 8;
    const numbers = /\d/.test(passwordValue);
    const specialCharacters = /[@,_*!./-]/.test(passwordValue);

    const matchingPasswords =
      passwordValue.length === 0 || confirmPasswordValue.length === 0
        ? false
        : passwordValue === confirmPasswordValue;

    const isFormValid =
      lowercaseLetters &&
      minCharacters &&
      numbers &&
      specialCharacters &&
      uppercaseLetters &&
      matchingPasswords;

    return {
      lowercaseLetters,
      minCharacters,
      numbers,
      specialCharacters,
      uppercaseLetters,
      matchingPasswords,
      isFormValid,
    };
  }, [confirmPasswordValue, passwordValue]);

  const register = async () => {
    await dispatch(
      registerAction({
        email,
        password: passwordValue,
        firstName,
        lastName,
      }),
    ).unwrap();

    navigation.navigate("SuccessfulRegistration");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <StatusBar style="dark" />

      {/* HEADER */}
      <View
        style={{
          flex: 0.2,
          gap: spacing.medium,
          paddingHorizontal: spacing.medium,
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: "#1E232C",
            textAlign: "center",
          }}
        >
          Set up a password
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: "#1E232C",
            lineHeight: 22,
          }}
        >
          {`Welcome aboard, ${firstName}! Please create a secure password including the following criteria below.`}
        </Text>
      </View>

      {/* LOGIN FORM */}
      <View
        style={{
          flex: 0.2,
          padding: spacing.medium,
          gap: 20,
        }}
      >
        {/* password */}
        <TextInput
          onChangeText={setPasswordValue}
          value={passwordValue}
          placeholder="Enter your password"
          autoComplete="new-password"
          secureTextEntry
          maxLength={50}
        />

        {/* confirm password */}
        <TextInput
          onChangeText={setConfirmPasswordValue}
          value={confirmPasswordValue}
          placeholder="Confirm your password"
          secureTextEntry
          maxLength={50}
        />
      </View>

      <View
        style={{
          flex: 0.2,
          flexDirection: "row",
          flexWrap: "wrap",
          gap: spacing.medium,
          padding: spacing.medium,
        }}
      >
        <Badge
          text="Lowercase letters (a-z)"
          isSuccess={criteriaStatus.lowercaseLetters}
        />
        <Badge
          text="Min. 8 characters"
          isSuccess={criteriaStatus.minCharacters}
        />
        <Badge
          text="Uppercase letters (A-Z)"
          isSuccess={criteriaStatus.uppercaseLetters}
        />
        <Badge text="Numbers" isSuccess={criteriaStatus.numbers} />
        <Badge
          text="Special characters (@,_*!./-)"
          isSuccess={criteriaStatus.specialCharacters}
        />
        <Badge
          text="Matching passwords"
          isSuccess={criteriaStatus.matchingPasswords}
        />
      </View>

      {/* BUTTONS */}
      <View
        style={{
          flex: 0.4,
          padding: spacing.medium,
          gap: 10,
          alignItems: "center",
        }}
      >
        <Button
          text="Finish registration"
          onPress={register}
          disabled={!criteriaStatus.isFormValid}
        />
      </View>
    </View>
  );
};

export default SetupPassword;
