import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useRef, useState } from "react";
import { Text, View } from "react-native";

import Acknowledgement from "../../../components/Acknowledgement";
import Button from "../../../components/Button";
import TextInput, { TextInputRef } from "../../../components/TextInput";
import { useHaptics } from "../../../hooks/useHaptics";
import { AuthStackNavigationType } from "../../../navigation/AuthNavigator";
import { spacing } from "../../../theme";

const Register = () => {
  const haptics = useHaptics();
  const navigation = useNavigation<AuthStackNavigationType<"Register">>();

  const firstNameRef = useRef<TextInputRef>(null);

  const [emailValue, setEmailValue] = useState("");
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");

  const isFormValid = useMemo(
    () => emailValue !== "" && firstNameValue !== "" && lastNameValue !== "",
    [emailValue, firstNameValue, lastNameValue],
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("transitionEnd", () => {
      if (firstNameRef.current) {
        firstNameRef.current.focus();
      }
    });

    return unsubscribe;
  }, [navigation]);

  const navigateToSetupPassword = () => {
    haptics.runNavigateHaptic();

    navigation.navigate("SetupPassword", {
      email: emailValue,
      firstName: firstNameValue,
      lastName: lastNameValue,
    });
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
      <View style={{ flex: 0.2, gap: spacing.medium }}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: "#1E232C",
            textAlign: "center",
          }}
        >
          Register
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: "#1E232C",
          }}
        >
          Join us to to get Fit&Lit with our community!
        </Text>
      </View>

      {/* LOGIN FORM */}
      <View
        style={{
          flex: 0.3,
          padding: spacing.medium,
          gap: spacing.medium,
        }}
      >
        {/* first name */}
        <TextInput
          ref={firstNameRef}
          onChangeText={setFirstNameValue}
          value={firstNameValue}
          placeholder="Enter your first name"
          // autoComplete="name"
          maxLength={50}
        />

        {/* last name */}
        <TextInput
          onChangeText={setLastNameValue}
          value={lastNameValue}
          placeholder="Enter your last name"
          // autoComplete="name-family"
          maxLength={50}
        />

        {/* email */}
        <TextInput
          onChangeText={setEmailValue}
          value={emailValue}
          placeholder="Enter email address"
          // autoComplete="email"
          keyboardType="email-address"
          maxLength={50}
        />
      </View>

      {/* BUTTONS */}
      <View
        style={{
          flex: 0.5,
          padding: spacing.medium,
          gap: spacing.huge,
        }}
      >
        <Button
          text="Next"
          disabled={!isFormValid}
          onPress={navigateToSetupPassword}
        />

        <Acknowledgement />
      </View>
    </View>
  );
};

export default Register;
