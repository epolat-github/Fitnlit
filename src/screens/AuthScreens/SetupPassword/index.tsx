import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Badge from "../../../components/Badge";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import { useSnackbarContext } from "../../../context/SnackbarContext";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import {
  AuthStackNavigationRouteProp,
  AuthStackNavigationType,
} from "../../../navigation/AuthNavigator";
import { registerAction } from "../../../slices/authSlice";
import { spacing } from "../../../theme";
import { GENDER } from "../../../types/auth.type";

const SetupPassword = () => {
  const route = useRoute<AuthStackNavigationRouteProp<"SetupPassword">>();
  const navigation = useNavigation<AuthStackNavigationType<"Register">>();
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbarContext();
  const { height } = useWindowDimensions();

  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const [isLoading, setIsLoading] = useState(false);

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
    try {
      setIsLoading(true);

      await dispatch(
        registerAction({
          email,
          firstName,
          lastName,
          password: passwordValue,
          passwordConfirm: confirmPasswordValue,
          userName: "",
          birthDate: "",
          phoneNumber: "",
          gender: GENDER.FEMALE,
          profilePicture: "",
        }),
      ).unwrap();

      setIsLoading(false);
      navigation.navigate("SuccessfulRegistration");
    } catch (err: any) {
      setIsLoading(false);
      showSnackbar(err?.message, {
        variant: "error",
      });
      console.log(err);
    }
  };

  const togglePasswordVisibility = (type: "password" | "confirmPassword") => {
    if (type === "password") {
      setIsPasswordVisible((prev) => !prev);
    } else if (type === "confirmPassword") {
      setIsConfirmPasswordVisible((prev) => !prev);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{
        flex: 1,
      }}
      contentContainerStyle={{
        justifyContent: "space-between",
        flex: 1,
        gap: spacing.large,
      }}
      extraScrollHeight={height * 0.3}
    >
      <StatusBar style="dark" />

      {/* HEADER */}
      <View
        style={{
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

      <View
        style={{
          flex: 1,
        }}
      >
        {/* LOGIN FORM */}
        <View
          style={{
            padding: spacing.medium,
            gap: spacing.medium,
          }}
        >
          {/* password */}
          <TextInput
            onChangeText={setPasswordValue}
            value={passwordValue}
            placeholder="Enter your password"
            autoComplete="new-password"
            secureTextEntry={!isPasswordVisible}
            maxLength={50}
            rightIcon={() => (
              <TouchableOpacity
                onPress={() => togglePasswordVisibility("password")}
              >
                <Entypo
                  name={isPasswordVisible ? "eye" : "eye-with-line"}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            )}
          />

          {/* confirm password */}
          <TextInput
            onChangeText={setConfirmPasswordValue}
            value={confirmPasswordValue}
            placeholder="Confirm your password"
            secureTextEntry={!isConfirmPasswordVisible}
            maxLength={50}
            enterKeyHint="done"
            rightIcon={() => (
              <TouchableOpacity
                onPress={() => togglePasswordVisibility("confirmPassword")}
              >
                <Entypo
                  name={isConfirmPasswordVisible ? "eye" : "eye-with-line"}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            )}
          />
        </View>

        <View
          style={{
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
            padding: spacing.medium,
            alignItems: "center",
            marginTop: spacing.medium,
          }}
        >
          <Button
            text="Finish registration"
            onPress={register}
            disabled={!criteriaStatus.isFormValid}
            isLoading={isLoading}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SetupPassword;
