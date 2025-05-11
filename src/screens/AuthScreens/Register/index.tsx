import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as yup from "yup";

import Acknowledgement from "../../../components/Acknowledgement";
import Button from "../../../components/Button";
import TextInput, { TextInputRef } from "../../../components/TextInput";
import { useHaptics } from "../../../hooks/useHaptics";
import { AuthStackNavigationType } from "../../../navigation/AuthNavigator";
import { spacing } from "../../../theme";

const schema = yup
  .object({
    email: yup.string().email().min(3).max(320).required(),
    firstName: yup.string().min(1).max(30).required(),
    lastName: yup.string().min(1).max(30).required(),
  })
  .required();

type Schema = yup.InferType<typeof schema>;

const Register = () => {
  const haptics = useHaptics();
  const navigation = useNavigation<AuthStackNavigationType<"Register">>();

  const firstNameRef = useRef<TextInputRef>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isValidating },
  } = useForm<Schema>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener("transitionEnd", () => {
      if (firstNameRef.current) {
        firstNameRef.current.focus();
      }
    });

    return unsubscribe;
  }, [navigation]);

  const navigateToSetupPassword = (data: Schema) => {
    const { email, firstName, lastName } = data;

    haptics.runNavigateHaptic();

    navigation.navigate("SetupPassword", {
      email,
      firstName,
      lastName,
    });
  };

  return (
    <KeyboardAwareScrollView
      style={{
        flex: 1,
      }}
      contentContainerStyle={{
        justifyContent: "center",
        flex: 1,
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

      {/* REGISTER FORM */}
      <View
        style={{
          flex: 0.4,
          padding: spacing.medium,
          gap: spacing.medium,
        }}
      >
        {/* first name */}
        <Controller
          name="firstName"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              ref={firstNameRef}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Enter your first name"
              autoComplete="given-name"
              maxLength={50}
              error={errors.firstName?.message}
            />
          )}
        />

        {/* last name */}
        <Controller
          name="lastName"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              placeholder="Enter your last name"
              autoComplete="name-family"
              maxLength={50}
              error={errors.lastName?.message}
            />
          )}
        />

        {/* email */}
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              autoCapitalize="none"
              placeholder="Enter email address"
              keyboardType="email-address"
              autoComplete="email"
              maxLength={50}
              error={errors.email?.message}
            />
          )}
        />
      </View>

      {/* BUTTONS */}
      <View
        style={{
          flex: 0.4,
          padding: spacing.medium,
          gap: spacing.huge,
        }}
      >
        <Button
          text="Next"
          disabled={!isValid && !isValidating}
          onPress={handleSubmit(navigateToSetupPassword)}
        />

        <Acknowledgement />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Register;
